/**
 * Genre for use in Movie class
 */
export class Genre {
  Name: string;
  Description: string;
  constructor(name: string, description: string) {
    (this.Name = name), (this.Description = description);
  }
}
/**
 * Director for use in Movie class
 */
export class Director {
  Name: string;
  Bio: string;
  Image: string;

  constructor(name: string, bio: string, image: string) {
    (this.Name = name), (this.Bio = bio), (this.Image = image);
  }
}
/**
 * Full movie object to be used to specify data types
 */
export class Movie {
  Title: string;
  Description: string;
  Genre: Genre;
  Director: Director;
  ImagePath: string;
  Featured: boolean;
  _id: string;

  constructor(
    title: string,
    description: string,
    genre: Genre,
    director: Director,
    imagePath: string,
    featured: boolean,
    id: string
  ) {
    (this.Title = title),
      (this.Description = description),
      (this.Genre = genre),
      (this.Director = director),
      (this.ImagePath = imagePath),
      (this.Featured = featured),
      (this._id = id);
  }
}
