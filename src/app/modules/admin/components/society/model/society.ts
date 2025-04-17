export interface Society {
  id: number,
  name: String,
  domaine: String,
  location: String,
}

export class Society {
  constructor(
    public id: number,
    public name: String,
    public domaine: String,
    public location: String,
  ) {}
}