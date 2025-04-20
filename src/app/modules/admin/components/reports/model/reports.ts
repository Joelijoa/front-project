export interface TotalReports {
  label: String,
  value: number
}

export class TotalReports {
  constructor(
    public label: String,
    public value: number,
    public trend?: number
  ) {}
}

export interface ChartPeriodOption {
  label: String;
  value: String;
}

export interface RecentOffer {
  title: String;
  client: String;
  applications: number;
  status: String;
  date: String;
}
