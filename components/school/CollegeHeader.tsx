import { SchoolData } from "../../schema";
import { MAIN } from "../../styles";
import { DESKTOP_MEDIA } from "../../utils/responsive";

const CollegeHeader = (props: { school: SchoolData }) => {
  const { school } = props;

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: 10,
        [DESKTOP_MEDIA]: {
          justifyContent: "inherit",
          paddingBottom: "inherit"
        }
      }}
    >
      <div css={{ display: "flex", marginBottom: "16px" }}>
        <img css={styles.headerImg} src={school.logo_url || undefined} />
        <div css={{ paddingTop: 10 }}>
          <h1 id="top" css={styles.name}>
            {school.name}
          </h1>
          {school && (
            <div css={styles.locationText}>
              <div css={{ marginBottom: 10 }}>
                {school.city}, {school.state}
              </div>
            </div>
          )}
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
  locationText: {
    color: "black",
    fontSize: 16
  },
  headerImg: {
    maxWidth: 121,
    maxHeight: 121
  }
};

export default CollegeHeader;
