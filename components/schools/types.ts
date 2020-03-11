import { CountriesResponse, DisciplinesResponse, InfluentialSchoolsPageRequest } from "../../schema";

export type FilterProps = {
  request: InfluentialSchoolsPageRequest;
  disciplines: DisciplinesResponse;
  countries: CountriesResponse;
  updateRequest: (request: InfluentialSchoolsPageRequest) => void;
};