export interface Society {
  id: number,
  name: String,
  domaine: String,
  location: String,
  email?: String,
  phone?: String,
  logo?: String,
  description?: String,
  website?: String
}

export class Society {
  constructor(
    public id: number,
    public name: String,
    public domaine: String,
    public location: String,
    public email?: String,
    public phone?: String,
    public logo?: String,
    public description?: String,
    public website?: String
  ) {}
}