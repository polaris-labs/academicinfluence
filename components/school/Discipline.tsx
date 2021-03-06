import { useState } from "react";
import { DisciplineInfluenceData, SchoolData } from "../../schema";
import { SectionDescription, SectionTitle } from "../../styles";
import CircularProgress from "../CircularProgress";
import ContentCard from "../ContentCard";
import HtmlContent from "../HtmlContent";

type SchoolProps = {
  school: SchoolData;
};

const DisciplineContainer = (props: SchoolProps) => {
  const { school } = props;
  const { disciplines, name } = school;

  const generateCards = () =>
    Object.entries(disciplines)
      .filter(([discipline, data]) => discipline != "")
      .map(([discipline, data], index) => {
        return (
          <DisciplineCard
            key={index}
            school={school}
            discipline={discipline}
            data={data}
          />
        );
      });

  const allCards = generateCards();
  const [cards, setCards] = useState(allCards.slice(0, 9));

  return (
    <section>
      <SectionTitle id="subjects">
        What subject is {props.school.name} best known for?
      </SectionTitle>
      <SectionDescription>
        <HtmlContent html={props.school.disciplines_text} />
      </SectionDescription>
      <div
        css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {cards}
      </div>
      {cards.length < allCards.length && (
        <div
          onClick={() => setCards(allCards)}
          css={{ fontWeight: "bold", textAlign: "center" }}
        >
          MORE <img src="/images/arrow-down.png" />
        </div>
      )}
    </section>
  );
};

//TODO: title = uni name: subject (on h4)
const DisciplineCard = (props: {
  school: SchoolData;
  discipline: string;
  data: DisciplineInfluenceData;
}) => {
  let titleTag = `${props.school.name}:  ${props.discipline}`;

  return (
    <ContentCard
      style={{
        width: 280,
        height: 150,
        padding: 8,
        marginRight: 20,
        marginBottom: 20,
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      <div
        css={{
          flex: "1 1 100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <h4 title={titleTag} css={styles.cardHeader}>
          {props.discipline}
        </h4>
        {/* <CheckBox /> */}
      </div>
      <div>
        <CircularProgress
          size={95}
          fontSize={10}
          percentage={props.data.influence * 100}
          text="Discipline IR"
        />
      </div>

      <div css={{ marginLeft: 20 }}>
        <p> #{props.data.usa_rank} in USA</p>
        <p> #{props.data.world_rank} in Worldwide</p>
      </div>
    </ContentCard>
  );
};

const styles = {
  cardHeader: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold" as "bold",
    marginTop: 0,
    marginLeft: 8
  }
};

export default DisciplineContainer;
