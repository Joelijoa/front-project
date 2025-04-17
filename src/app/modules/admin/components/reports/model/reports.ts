export interface TotalReports {
  label: String,
  value: number
}

export class TotalReports {
  constructor(
    public label: String,
    public value: number
  ) {}
}
