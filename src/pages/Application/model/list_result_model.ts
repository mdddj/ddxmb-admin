
export interface AllAppResult {
  state: number;
  message: string;
  data: DtkDetail[];
}

export interface DtkDetail {
  id: number;
  appKey: string;
  appSecret: string;
  title: string;
  intro: string;
  selectDefault: boolean;
  logo: string;
}

