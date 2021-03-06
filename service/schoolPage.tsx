import {
  disciplineBreakdownQuery,
  extractDisciplineBreakdownWithYears
} from "../influenceScore";
import { SchoolPageRequest, SchoolPageResponse } from "../schema";
import {
  addPartialPersonFields,
  extractPartialPersonWithOverall,
  PERSON_ENTITY_TYPE
} from "./databasePerson";
import { extractEntityFields, lookupBySlug } from "./entityDatabase";
import processHtml from "./processHtml";
import {
  addPartialSchoolFields,
  extractPartialSchoolFields,
  SCHOOL_ENTITY_TYPE
} from "./schoolDatabase";
const months = require("months");

// 800-200
const SAT_SCORES = [
  99,
  99,
  99,
  99,
  99,
  99,
  99,
  99,
  99,
  98,
  98,
  98,
  98,
  97,
  97,
  97,
  97,
  96,
  96,
  95,
  95,
  93,
  94,
  92,
  93,
  91,
  92,
  90,
  90,
  87,
  89,
  85,
  87,
  84,
  85,
  82,
  83,
  79,
  81,
  77,
  78,
  74,
  76,
  72,
  73,
  69,
  69,
  66,
  67,
  62,
  64,
  60,
  60,
  56,
  56,
  53,
  53,
  50,
  49,
  46,
  46,
  43,
  43,
  40,
  39,
  36,
  35,
  33,
  32,
  30,
  29,
  27,
  26,
  24,
  23,
  21,
  21,
  19,
  18,
  16,
  15,
  14,
  13,
  12,
  11,
  11,
  10,
  9,
  8,
  8,
  7,
  6,
  6,
  5,
  5,
  4,
  4,
  3,
  3,
  3,
  3,
  2,
  2,
  2,
  2,
  1,
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1
];

function lookupSatMath(score: number) {
  return SAT_SCORES[Math.round((80 - score / 10) * 2 + 1)];
}
function lookupSatVerbal(score: number) {
  return SAT_SCORES[Math.round((80 - score / 10) * 2)];
}

function calcTemp(temps: number[], start: number, end: number) {
  let total = 0;
  for (let index = start; index < end; index++) {
    total += temps[index];
  }
  return total / (end - start);
}

function calcSeason(
  maximums: number[],
  minimums: number[],
  start: number,
  end: number
) {
  return {
    high: calcTemp(maximums, start, end),
    low: calcTemp(minimums, start, end)
  };
}

function calcWeather(maximums: number[], minimums: number[]) {
  if (maximums.length == 0 || minimums.length == 0) {
    return null;
  }
  return {
    winter: calcSeason(maximums, minimums, 0, 3),
    spring: calcSeason(maximums, minimums, 3, 6),
    summer: calcSeason(maximums, minimums, 6, 9),
    fall: calcSeason(maximums, minimums, 9, 12)
  };
}

export default async function serveSchoolPage(
  request: SchoolPageRequest
): Promise<SchoolPageResponse> {
  const schoolQuery = lookupBySlug(SCHOOL_ENTITY_TYPE, request.slug)
    .apply(addPartialSchoolFields)
    .addEntityFields(SCHOOL_ENTITY_TYPE)
    .field("undergrad_tuition_out_of_state")
    .field("grad_tuition_in_state")
    .field("grad_tuition_out_of_state")
    .field("undergrad_fees_in_state")
    .field("undergrad_fees_out_of_state")
    .field("grad_fees_in_state")
    .field("grad_fees_out_of_state")
    .field("average_net_price")
    .field("average_earnings")
    .field("employed_10_years")
    .field("desirability_rank")
    .field("weather_maximums")
    .field("weather_minimums")
    .field("campus_property_crime_rate")
    .field("campus_violent_crime_rate")
    .field("city_property_crime_rate")
    .field("city_violent_crime_rate")
    .field("disciplines_text")
    .field("influential_alumni_text")
    .field("address")
    .field("zip")
    .field("website")
    .field("admissions_website")
    .field("facebook_id")
    .field("twitter_username")
    .field("instagram_username")
    .field("youtube_channel")
    .field("ST_X(location::geometry)", "lng")
    .field("ST_Y(location::geometry)", "lat")
    .execute();

  const disciplineQuery = disciplineBreakdownQuery(
    SCHOOL_ENTITY_TYPE,
    request.slug,
    true
  );

  const alumniQuery = lookupBySlug(SCHOOL_ENTITY_TYPE, request.slug)
    .join(
      "ai_data.person_schools",
      undefined,
      "person_schools.school_id = schools.id"
    )
    .where("person_schools.relationship = ?", "Student")
    .followLink(PERSON_ENTITY_TYPE, "person_schools.person_id")
    .apply(addPartialPersonFields)
    .addInfluenceFields(PERSON_ENTITY_TYPE)
    .order("influence", false)
    .limit(3)
    .execute();

  const school = (await schoolQuery).rows[0];

  return {
    school: {
      ...extractPartialSchoolFields(school),
      ...(await extractEntityFields(school)),
      address: school.address,
      zip: school.zip,
      website: school.website,
      facebook_id: school.facebook_id,
      twitter_username: school.twitter_username,
      instagram_username: school.instagram_username,
      youtube_channel: school.youtube_channel,

      admissions_website: school.admissions_website,
      employed_10_years: school.employed_10_years,
      desirability_rank: school.desirability_rank,
      undergrad_tuition_out_of_state: school.undergrad_tuition_out_of_state,
      grad_tuition_out_of_state: school.grad_tuition_out_of_state,
      grad_tuition_in_state: school.grad_tuition_in_state,

      undergrad_fees_in_state: school.undergrad_fees_in_state,
      undergrad_fees_out_of_state: school.undergrad_fees_out_of_state,
      grad_fees_in_state: school.grad_fees_in_state,
      grad_fees_out_of_state: school.grad_fees_out_of_state,

      average_net_price: school.average_net_price,
      campus_property_crime_rate: school.campus_property_crime_rate,
      campus_violent_crime_rate: school.campus_violent_crime_rate,
      city_property_crime_rate: school.city_property_crime_rate,
      city_violent_crime_rate: school.city_violent_crime_rate,
      test_competitiveness: lookupSatMath(school.median_sat / 2) / 100,
      ...extractDisciplineBreakdownWithYears(await disciplineQuery),
      alumni: (await alumniQuery).rows.map(extractPartialPersonWithOverall),
      weather: calcWeather(school.weather_maximums, school.weather_minimums),
      disciplines_text: await processHtml(school.disciplines_text),
      influential_alumni_text: await processHtml(
        school.influential_alumni_text
      ),
      location:
        school.lat && school.lng
          ? {
              lat: school.lat,
              lng: school.lng
            }
          : null
    }
  };
}
