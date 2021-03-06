import { NextPage, NextPageContext } from "next";
import { apiPersonPage } from "../../api";
import {
  InfluenceScore,
  InfluentialWorks,
  OtherResources,
  ProfileDescription,
  ProfileDiscipline,
  ProfileHeader,
  ProfileSchools
} from "../../components/people";
import { PersonData } from "../../schema";
import StandardPage from "../../templates/StandardPage";

type PersonProps = {
  person: PersonData;
};

const Person: NextPage<PersonProps> = (props: PersonProps) => {
  let {
    image_url,
    image_source_url,
    name,
    birth_year,
    death_year,
    short_description,
    description,
    overall,
    disciplines,
    schools,
    links,
    works
  } = props.person;

  return (
    <StandardPage title={name} section="influential-people" hideTitle>
      <style jsx>
        {`
          .profileSidebar {
            display: flex;
            flex-direction: row;
            margin-left: 6%;
          }
          .profileDetail {
            display: flex;
            margin-left: 124px;
            padding-top: 8px;
          }
          @media (max-width: 1069px) {
            .profileSidebar {
              display: flex;
              flex-direction: column;
              margin-left: 5%;
              margin-right: 4%;
            }
            .profileDetail {
              display: flex;
              margin-left: 0px;
              padding-top: 12px;
            }
          }
        `}
      </style>
      <div css={{ display: "flex", flexDirection: "column" }}>
        <ProfileHeader person={props.person} />

        <div className="profileDetail">
          <InfluenceScore overall={overall} />
          <ProfileSchools schools={schools} />
          <ProfileDiscipline disciplines={disciplines} />
        </div>

        <ProfileDescription
          style={styles.DescriptionTextStyle}
          person={props.person}
        />

        <div css={{ display: "flex", flexWrap: "wrap" }}>
          <InfluentialWorks style={styles.InfluenceWorksStyle} works={works} />
          <OtherResources links={links} />
        </div>
      </div>
    </StandardPage>
  );
};

const styles = {
  DescriptionTextStyle: {
    fontSize: 18,
    marginTop: 33,
    marginBottom: 40,
    lineHeight: 1.78
  },
  InfluenceWorksStyle: {
    display: "inline-block",
    maxWidth: "100vw",
    minWidth: 320,
    marginRight: 40
  }
};

Person.getInitialProps = async function(context: NextPageContext) {
  const data = await apiPersonPage({
    slug: context.query.slug as string
  });

  return {
    person: data.person
  };
};

export default Person;
