import { DisciplineLink } from "../../links";
import { DisciplinesResponse } from "../../schema";
import { GRAY, GRAY_DARKEST, MAIN } from "../../styles";

type SubdisciplineListProps = {
  discipline: string;
  subdiscipline?: string;
  disciplines: DisciplinesResponse;
};

export default function SubdisciplineList(props: SubdisciplineListProps) {
  return (
    <div>
      <style jsx>
        {`
          .tableList {
            padding-left: 0px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
        `}
      </style>
      <ul className="tableList">
        {props.disciplines
          .filter((discipline: any) => discipline.parent === props.discipline)
          .map((discipline: any) => (
            <DisciplineLink discipline={discipline} key={discipline.slug}>
              <a
                style={
                  props.subdiscipline == discipline.slug
                    ? styles.linkStyle
                    : styles.defaultlinkStyle
                }
              >
                <li
                  style={
                    props.subdiscipline == discipline.slug
                      ? styles.liStyle
                      : styles.defaultliStyle
                  }
                >
                  {discipline.name}
                </li>
              </a>
            </DisciplineLink>
          ))}
      </ul>
    </div>
  );
}

const styles = {
  defaultliStyle: {
    backgroundColor: MAIN,
    border: 1,
    borderStyle: "solid",
    borderColor: GRAY_DARKEST,
    height: 32,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 265
  },
  liStyle: {
    backgroundColor: "rgba(55, 194, 171, 0.2)",
    border: 1,
    borderStyle: "solid",
    borderColor: GRAY_DARKEST,
    height: 32,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 265
  },
  defaultlinkStyle: {
    textDecoration: "none",
    color: GRAY,
    fontSize: 12,
    fontWeight: 500
  },
  linkStyle: {
    textDecoration: "none",
    color: MAIN,
    fontSize: 12,
    fontWeight: 600
  }
};