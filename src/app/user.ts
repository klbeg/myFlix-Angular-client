/**
 * Full user class to be used to specify data types
 */
export class User {
  _id: string;
  FavoriteMovies: string[];
  Name: string;
  Username: string;
  Password: string;
  Email: string;
  Birthdate: string;
  constructor(
    id: string,
    favoriteMovies: string[],
    name: string,
    username: string,
    password: string,
    email: string,
    birthdate: string
  ) {
    (this._id = id),
      (this.FavoriteMovies = favoriteMovies),
      (this.Name = name),
      (this.Username = username),
      (this.Password = password),
      (this.Email = email),
      (this.Birthdate = birthdate);
  }
}
