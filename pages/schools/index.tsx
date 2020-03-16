import { useState } from "react";
import { apiInfluentialSchoolsPage, apiPage } from "../../api";
import HtmlContent from "../../components/HtmlContent";
import DISPLAY_MODES from "../../components/schools/constants";
import ListTopMenu from "../../components/schools/ListTopMenu";
import SchoolList from "../../components/schools/SchoolList";
import QuerySchema, { RangeParameter } from "../../QuerySchema";
import {
  InfluentialSchoolsPageRequest,
  InfluentialSchoolsPageResponse,
  PageResponse
} from "../../schema";
import { PageDescription, PageTitle } from "../../styles";
import StandardPage from "../../templates/StandardPage";
import QueryPage from "../../utils/QueryPage";

const QUERY_SCHEMA = QuerySchema("/schools", {
  discipline: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  },
  years: RangeParameter(-4000, 2020),
  country: {
    toQuery: value => value,
    fromQuery: value => value,
    default: null as null | string,
    canonical: true
  }
});

type InfluentialSchoolsProps = InfluentialSchoolsPageResponse & {
  request: InfluentialSchoolsPageRequest;
  updateRequest: (request: InfluentialSchoolsPageRequest) => void;
  page: PageResponse;
};

const InfluentialSchools: React.SFC<InfluentialSchoolsProps> = props => {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODES.grid);

  return (
    <StandardPage title="Influential Schools">
      <PageTitle>Influential Schools</PageTitle>
      <PageDescription>
        <HtmlContent html={props.page.content} />
      </PageDescription>
      <ListTopMenu
        {...props}
        mode={displayMode}
        onDisplayModeSelect={setDisplayMode}
      />
      <SchoolList mode={displayMode} schools={props.schools} />
    </StandardPage>
  );
};

export default QueryPage(
  InfluentialSchools,
  QUERY_SCHEMA,
  {
    title: "Influential Schools"
  },
  async (request, signal) => {
    const schools = apiInfluentialSchoolsPage(request, signal);
    const page = apiPage("schools");
    return {
      ...(await schools),
      page: await page
    };
  },
  props => props.schools.length == 0
);
