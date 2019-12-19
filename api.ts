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

export interface FeaturesPageRequest {
  category: string | null;
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
  articles: FeaturesPageArticle[];
}
export interface FeaturesPageCategory {
  name: string;
  slug: string;
}
export interface FeaturesPageArticle {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  featuredImage: string;
}
export const apiFeaturesPage = process.browser ? 
        async function(request: FeaturesPageRequest): Promise<FeaturesPageResponse> {
            const response = await fetch("/api/FeaturesPage/" + encodeURIComponent(JSON.stringify(request)));
            return response.json()
        } : async function(request: FeaturesPageRequest): Promise<FeaturesPageResponse> {
            const module = await import("./service/featuresPage");
            return module.default(request)
        }
        