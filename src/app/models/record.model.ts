export interface EntityResponse {
  data: EntityRecord | EntityRecord[];
  oDataContext: string;
  isSingleton: boolean;
}

export interface EntityRecord {
  [name: string]: string | number;
}
