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
  | "desirability";

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
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

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
  total_students: number | null;
  influence_score: number | null;
  acceptance_rate: number | null;
  desirability: number | null;
  logo_url: string | null;
}
export const apiCollegeRankings = process.browser ? 
        async function(request: CollegeRankingsRequest): Promise<CollegeRankingsResponse> {
            const response = await fetch("/api/CollegeRankings/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: CollegeRankingsRequest): Promise<CollegeRankingsResponse> {
            const module = await import("./service/collegeRankings");
            return module.default(request)
        }
        /* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type LocationAutocompleteRequest = string;
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface LocationAutocompleteResponse {
  cities: {
    name: string;
    long: string;
    lat: string;
  }[];
}
export const apiLocationAutocomplete = process.browser ? 
        async function(request: LocationAutocompleteRequest): Promise<LocationAutocompleteResponse> {
            const response = await fetch("/api/LocationAutocomplete/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: LocationAutocompleteRequest): Promise<LocationAutocompleteResponse> {
            const module = await import("./service/locationAutocomplete");
            return module.default(request)
        }
        /* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DisciplinesRequest {}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DisciplinesResponse {
  /**
   * This interface was referenced by `DisciplinesResponse`'s JSON-Schema definition
   * via the `patternProperty` "^[A-Za-z ]+$".
   */
  [k: string]: {
    parent: string | null;
  };
}
export const apiDisciplines = process.browser ? 
        async function(request: DisciplinesRequest): Promise<DisciplinesResponse> {
            const response = await fetch("/api/Disciplines/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: DisciplinesRequest): Promise<DisciplinesResponse> {
            const module = await import("./service/disciplines");
            return module.default(request)
        }
        /* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface FeaturesPageRequest {
  category: string | null;
  article: string | null;
}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

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
export const apiFeaturesPage = process.browser ? 
        async function(request: FeaturesPageRequest): Promise<FeaturesPageResponse> {
            const response = await fetch("/api/FeaturesPage/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: FeaturesPageRequest): Promise<FeaturesPageResponse> {
            const module = await import("./service/featuresPage");
            return module.default(request)
        }
        /* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface HomePageRequest {}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface HomePageResponse {
  currentFeature: {
    title: string;
    category: string;
    slug: string;
    bannerUrl: string;
    thumbnailUrl: string;
  };
}
export const apiHomePage = process.browser ? 
        async function(request: HomePageRequest): Promise<HomePageResponse> {
            const response = await fetch("/api/HomePage/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: HomePageRequest): Promise<HomePageResponse> {
            const module = await import("./service/homePage");
            return module.default(request)
        }
        /* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface InfluencerPageRequest {
  slug: string;
}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface InfluencerPageResponse {
  influencer: InfluencerData;
}
export interface InfluencerData {
  name: string;
  description: string;
  disciplines: InfluencerDisciplineInfluenceData;
}
export interface InfluencerDisciplineInfluenceData {
  /**
   * This interface was referenced by `InfluencerDisciplineInfluenceData`'s JSON-Schema definition
   * via the `patternProperty` "^[A-Za-z ]+$".
   */
  [k: string]: {
    world_rank: number;
    usa_rank: number;
    influence: number;
  };
}
export const apiInfluencerPage = process.browser ? 
        async function(request: InfluencerPageRequest): Promise<InfluencerPageResponse> {
            const response = await fetch("/api/InfluencerPage/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: InfluencerPageRequest): Promise<InfluencerPageResponse> {
            const module = await import("./service/influencerPage");
            return module.default(request)
        }
        /* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface SchoolPageRequest {
  slug: string;
}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

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
  logo_url: string | null;
  graduation_rate: string | null;
  disciplines: SchoolDisciplineInfluenceData;
}
export interface SchoolDisciplineInfluenceData {
  /**
   * This interface was referenced by `SchoolDisciplineInfluenceData`'s JSON-Schema definition
   * via the `patternProperty` "^[A-Za-z ]+$".
   */
  [k: string]: {
    world_rank: number;
    usa_rank: number;
    influence: number;
  };
}
export const apiSchoolPage = process.browser ? 
        async function(request: SchoolPageRequest): Promise<SchoolPageResponse> {
            const response = await fetch("/api/SchoolPage/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: SchoolPageRequest): Promise<SchoolPageResponse> {
            const module = await import("./service/schoolPage");
            return module.default(request)
        }
        