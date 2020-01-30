/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type CollegeRankingSort =
  | "undergrad_tuition_in_state"
  | "name"
  | "median_sat"
  | "average_earnings"
  | "acceptance_rate"
  | "total_students"
  | "influence_score"
  | "desirability"
  | "graduation_rate";
export type LocationAutocompleteRequest = string;

export interface ApiRoot {
  CollegeRankings?: {
    request?: CollegeRankingsRequest;
    response?: CollegeRankingsResponse;
  };
  LocationAutocomplete?: {
    request?: LocationAutocompleteRequest;
    response?: LocationAutocompleteResponse;
  };
  Disciplines?: {
    request?: DisciplinesRequest;
    response?: DisciplinesResponse;
  };
  FeaturesPage?: {
    request?: FeaturesPageRequest;
    response?: FeaturesPageResponse;
  };
  HomePage?: {
    request?: HomePageRequest;
    response?: HomePageResponse;
  };
  PersonPage?: {
    request?: PersonPageRequest;
    response?: PersonPageResponse;
  };
  SchoolPage?: {
    request?: SchoolPageRequest;
    response?: SchoolPageResponse;
  };
}
export interface CollegeRankingsRequest {
  sort: CollegeRankingSort;
  reversed: boolean;
  states: string[] | null;
  location: {
    name: string;
    lat: string;
    long: string;
    distance: {
      min: number;
      max: number;
    };
  } | null;
  discipline: string | null;
  tuition: {
    min: number;
    max: number;
  };
  median_sat: {
    min: number;
    max: number;
  };
  acceptance_rate: {
    min: number;
    max: number;
  };
  total_students: {
    min: number;
    max: number;
  };
  years: {
    min: number;
    max: number;
  };
}
export interface CollegeRankingsResponse {
  schools: CollegeData[];
  limits: {
    tuition: {
      min: number;
      max: number;
    };
    median_sat: {
      min: number;
      max: number;
    };
    acceptance_rate: {
      min: number;
      max: number;
    };
    total_students: {
      min: number;
      max: number;
    };
    years: {
      min: number;
      max: number;
    };
  };
}
export interface CollegeData {
  id: string;
  name: string;
  city: string;
  state: string;
  median_act: number | null;
  median_sat: number | null;
  undergrad_tuition_in_state: number | null;
  average_earnings: number | null;
  graduation_rate: number | null;
  total_students: number | null;
  influence_score: number | null;
  acceptance_rate: number | null;
  desirability: number | null;
  logo_url: string | null;
}
export interface LocationAutocompleteResponse {
  cities: {
    name: string;
    long: string;
    lat: string;
  }[];
}
export interface DisciplinesRequest {}
export interface DisciplinesResponse {
  /**
   * This interface was referenced by `DisciplinesResponse`'s JSON-Schema definition
   * via the `patternProperty` "^[A-Za-z ]+$".
   */
  [k: string]: {
    parent: string | null;
  };
}
export interface FeaturesPageRequest {
  category: string | null;
  article: string | null;
}
export interface FeaturesPageResponse {
  categories: FeaturesPageCategory[];
  category: {
    name: string;
    slug: string;
    description: string;
  } | null;
  article: FeaturePageArticle | null;
  articles: FeaturesPageArticleSummary[];
}
export interface FeaturesPageCategory {
  name: string;
  slug: string;
}
export interface FeaturePageArticle {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  bannerUrl: string;
  thumbnailUrl: string;
}
export interface FeaturesPageArticleSummary {
  title: string;
  slug: string;
  category: {
    slug: string;
    name: string;
  };
  excerpt: string;
  author: string;
  date: string;
  bannerUrl: string;
  thumbnailUrl: string;
}
export interface HomePageRequest {}
export interface HomePageResponse {
  currentFeature: {
    title: string;
    category: string;
    slug: string;
    bannerUrl: string;
    thumbnailUrl: string;
  };
}
export interface PersonPageRequest {
  slug: string;
}
export interface PersonPageResponse {
  person: PersonData;
}
export interface PersonData {
  name: string;
  description: string;
  disciplines: DisciplineInfluenceData;
}
export interface DisciplineInfluenceData {
  /**
   * This interface was referenced by `DisciplineInfluenceData`'s JSON-Schema definition
   * via the `patternProperty` "^[A-Za-z ]+$".
   */
  [k: string]: {
    world_rank: number;
    usa_rank: number;
    influence: number;
  };
}
export interface SchoolPageRequest {
  slug: string;
}
export interface SchoolPageResponse {
  school: SchoolData;
}
export interface SchoolData {
  name: string;
  description: string;
  city: string;
  state: string;
  median_act: number | null;
  median_sat: number | null;
  undergrad_tuition_in_state: number | null;
  average_earnings: number | null;
  total_students: number | null;
  acceptance_rate: number | null;
  desirability: number | null;
  desirability_rank: number | null;
  undergrad_tuition_out_of_state: number | null;
  grad_tuition_in_state: number | null;
  grad_tuition_out_of_state: number | null;
  undergrad_fees_in_state: number | null;
  undergrad_fees_out_of_state: number | null;
  grad_fees_in_state: number | null;
  grad_fees_out_of_state: number | null;
  average_net_price: number | null;
  logo_url: string | null;
  graduation_rate: number | null;
  test_competitiveness: number | null;
  overall: {
    world_rank: number;
    usa_rank: number;
    influence: number;
    over_time: {
      year: number;
      value: number;
    }[];
  };
  disciplines: DisciplineInfluenceData;
  people: {
    slug: string;
    name: string;
    description: string;
    influence: number;
  }[];
}
export const apiCollegeRankings = process.browser
  ? async function(
      request: CollegeRankingsRequest
    ): Promise<CollegeRankingsResponse> {
      const response = await fetch(
        "/api/CollegeRankings/" + encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(
      request: CollegeRankingsRequest
    ): Promise<CollegeRankingsResponse> {
      const module = await import("./service/collegeRankings");
      return module.default(request);
    };
export const apiLocationAutocomplete = process.browser
  ? async function(
      request: LocationAutocompleteRequest
    ): Promise<LocationAutocompleteResponse> {
      const response = await fetch(
        "/api/LocationAutocomplete/" +
          encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(
      request: LocationAutocompleteRequest
    ): Promise<LocationAutocompleteResponse> {
      const module = await import("./service/locationAutocomplete");
      return module.default(request);
    };
export const apiDisciplines = process.browser
  ? async function(request: DisciplinesRequest): Promise<DisciplinesResponse> {
      const response = await fetch(
        "/api/Disciplines/" + encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(request: DisciplinesRequest): Promise<DisciplinesResponse> {
      const module = await import("./service/disciplines");
      return module.default(request);
    };
export const apiFeaturesPage = process.browser
  ? async function(
      request: FeaturesPageRequest
    ): Promise<FeaturesPageResponse> {
      const response = await fetch(
        "/api/FeaturesPage/" + encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(
      request: FeaturesPageRequest
    ): Promise<FeaturesPageResponse> {
      const module = await import("./service/featuresPage");
      return module.default(request);
    };
export const apiHomePage = process.browser
  ? async function(request: HomePageRequest): Promise<HomePageResponse> {
      const response = await fetch(
        "/api/HomePage/" + encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(request: HomePageRequest): Promise<HomePageResponse> {
      const module = await import("./service/homePage");
      return module.default(request);
    };
export const apiPersonPage = process.browser
  ? async function(request: PersonPageRequest): Promise<PersonPageResponse> {
      const response = await fetch(
        "/api/PersonPage/" + encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(request: PersonPageRequest): Promise<PersonPageResponse> {
      const module = await import("./service/personPage");
      return module.default(request);
    };
export const apiSchoolPage = process.browser
  ? async function(request: SchoolPageRequest): Promise<SchoolPageResponse> {
      const response = await fetch(
        "/api/SchoolPage/" + encodeURIComponent(JSON.stringify(request))
      );
      return response.json();
    }
  : async function(request: SchoolPageRequest): Promise<SchoolPageResponse> {
      const module = await import("./service/schoolPage");
      return module.default(request);
    };
