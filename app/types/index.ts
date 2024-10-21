export interface Prompt {
  [key: string]: string | boolean;
}

export interface Item {
  name: string;
  image: string;
  key: string;
}

export interface ImageFilters {
  contrast: number;
  brightness: number;
  saturate: number;
}
