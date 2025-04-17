// export interface Users {
//   id: number,
//   name: string,
//   email: string,
//   location: string
// }

export class Users {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public location: string
  ) {}
}