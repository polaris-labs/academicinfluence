import { Dictionary } from "lodash";
import { DisciplineInfluenceData, SchoolPageRequest, SchoolPageResponse } from "../api";
import databasePool from "../databasePool";
import { influenceScoreQuery } from "../influenceScore";
import * as squel from "../squel";

export default async function serveSchoolPage(request: SchoolPageRequest): Promise<SchoolPageResponse> {

    const pool = await databasePool;

    const schoolQuery = pool.query(squel.select().from("editor.ai_schools")
        .join("ai_data.schools", undefined, "ai_data.schools.id = editor.ai_schools.id")
        .where("ai_schools.slug = ?", request.slug)
        .field("schools.name")
        .field("coalesce(nullif(ai_schools.description, ''), schools.description)", "description")
        .field("city")
        .field("state")
        .field("median_sat")
        .field("median_act")
        .field("undergrad_tuition_in_state")
        .field("undergrad_tuition_out_of_state")
        .field("grad_tuition_in_state")
        .field("grad_tuition_out_of_state")
        .field("undergrad_fees_in_state")
        .field("undergrad_fees_out_of_state")
        .field("grad_fees_in_state")
        .field("grad_fees_out_of_state")
        .field("average_net_price")
        .field("average_earnings")
        .field("desirability")
        .field("desirability_rank")
        .field("location")
        .field("graduation_rate")
        .field(squel.rstr("admissions::float / applications::float"), "acceptance_rate")
        .field(squel.rstr("undergraduate_students + graduate_students"), "total_students")
        .field("logo_url")
        .toString())

    const influenceQuery = pool.query(influenceScoreQuery(1900, 2020)
        .join("editor.ai_schools", undefined, "editor.ai_schools.id = scores.id")
        .where("editor.ai_schools.slug = ?", request.slug)
        .left_join("editor.ai_disciplines", undefined, "ai_disciplines.id = scores.keyword")
        .field("ai_disciplines.name")
        .field("scores.keyword")
        .field("world_rank")
        .field("usa_rank")
        .field("year_start")
        .field("by_year")
        .order("influence", false)
        .where("scores.keyword is null or ai_disciplines.name is not null")
        .toParam())

    const personQuery = pool.query(
        influenceScoreQuery(1900, 2020)
        .where("keyword is null")
        .join("ai_data.person_schools", undefined, "person_schools.person_id = scores.id")
        .join("editor.ai_schools", undefined, "editor.ai_schools.id = person_schools.school_id")
        .where("ai_schools.slug = ?", request.slug)
        .join("editor.ai_people", undefined, "editor.ai_people.id = scores.id")
        .join("ai_data.people", undefined, "ai_people.id = people.id")
        .field("ai_people.slug")
        .field("people.name")
        .field("coalesce(nullif(ai_people.description, ''), people.description)", "description")
        .order("influence", false)
        .limit(3)
        .toParam()
    )

    const school = (await schoolQuery).rows[0]

    let overall = null;

    const influences: Dictionary<DisciplineInfluenceData> = {}
    for (const row of (await influenceQuery).rows) {
        if (row.name === null) {
            overall = {
                influence: row.influence,
                world_rank: row.world_rank,
                usa_rank: row.usa_rank,
                over_time: row.by_year.map((value: number, index: number) => ({
                        year: index + row.year_start,
                        value
                    }))
            }
        } else {
            influences[row.name] = {
                influence: row.influence,
                world_rank: row.world_rank,
                usa_rank: row.usa_rank
            }
        }
        
    }

    return {
            school: {
                ...school,
                overall,
                disciplines: influences,
                people: (await personQuery).rows
            }
        }
}