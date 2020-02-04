import { NextPage, NextPageContext } from "next";
import { VictoryChart, VictoryLine } from "victory";
import { apiSchoolPage } from "../../../api";
import { SchoolData } from "../../../schema";
type SchoolProps = {
    school: SchoolData
};

const School: NextPage<SchoolProps> = (props: SchoolProps) => (
  <div>
      <img src={props.school.logo_url || ""}/>
      <div>
          Name: {props.school.name}
      </div>
      <div>
          Description: {props.school.description}
      </div>
      <div>
          City: {props.school.city}, {props.school.state}
      </div>
      <div>
          Influence Score: {props.school.overall.influence}
      </div>
      <div>
          Acceptance Rate: {props.school.acceptance_rate}
      </div>
      <div>
          Graduation Rate: {props.school.graduation_rate}
      </div>
      <div>
          Desirability: {props.school.desirability} #{props.school.desirability_rank}
      </div>
        <ol>

      {Object.entries(props.school.disciplines).map(([discipline, data]) => (<li>
            {discipline} {data.influence} #{data.world_rank} #{data.usa_rank} (USA)
       </li>))}
       </ol>
       <ol>

      {props.school.people.map((person) => (<li key={person.slug}>
            <a href={"/people/" + person.slug}>{person.name}</a> {person.overall.influence} {person.description}
       </li>))}

        </ol>

        <VictoryChart>
            <VictoryLine data={props.school.influence_over_time} x="year" y="value"/>
        </VictoryChart>

        <div>
            Tuition: {props.school.undergrad_tuition_in_state} (in-state) {props.school.undergrad_tuition_out_of_state} (out-of-state)
        </div>
        <div>
            Fees: {props.school.undergrad_fees_in_state} (in-state) {props.school.undergrad_fees_out_of_state} (out-of-state)
        </div>
        <div>
            Average net price: {props.school.average_net_price} (60k income)
        </div>
        <div>
            Test Competitiveness: {props.school.test_competitiveness}
        </div>
        <div>
            Sat: {props.school.median_sat} Act {props.school.median_act}
        </div>
        <div>
            Average earning 10 years: {props.school.average_earnings}
        </div>
        <div>
            Employed 10 years: {props.school.employed_10_years}
        </div>
        <div>
            {JSON.stringify(props.school.weather)}
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th/>
                        <th>Violent</th>
                        <th>Property</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Campus</td>
                        <td>{props.school.campus_violent_crime_rate}</td>
                        <td>{props.school.campus_violent_crime_rate}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{props.school.city_violent_crime_rate}</td>
                        <td>{props.school.city_violent_crime_rate}</td>
                    </tr>
                </tbody>
            </table>
        </div>

       <ol>

      {props.school.alumni.map((person) => (<li key={person.slug}>
            <a href={"/people/" + person.slug}>{person.name}</a> {person.overall.influence} {person.description}
       </li>))}

        </ol>
  </div>
);

School.getInitialProps = async function(context: NextPageContext) {
  const data = await apiSchoolPage({
      slug: context.query.slug as string
  })

  console.log(data)

  return {
      school: data.school
  };
};

export default School;
