import { PersonData } from "../../schema";
import { MAIN } from "../../styles";
import { YearRange } from "../../utils/years";

const ProfileHeader = (props: { person: PersonData }) => {
  const { person } = props;
  return (
    <div>
      <div css={{ display: "flex" }}>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
          }}
        >
          {person.image_url && (
            <img css={styles.headerImg} src={person.image_url} />
          )}
          {person.image_source_url && (
            <a href={person.image_source_url}>(Source)</a>
          )}
        </div>
        <div css={{ marginLeft: 20 }}>
          <h1 css={styles.name}>{person.name}</h1>
          <div css={styles.lifePeriod}>
            <div css={styles.profileTitle}>{person.short_description}</div>
            <div css={{ marginBottom: 10 }}>
              {" "}
              <YearRange person={person} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  name: {
    color: MAIN,
    fontSize: 28,
    margin: 0
  },
  lifePeriod: {
    fontSize: 20
  },
  headerImg: {
    width: 105,
    height: 140
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 600
  }
};

export default ProfileHeader;
