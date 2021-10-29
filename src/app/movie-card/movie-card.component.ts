import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenreDialog(genre: object): void {
    console.log('openGenreDialog: ', genre);
    this.dialog.open(GenreViewComponent, {
      data: genre,
    });
  }
  openDirectorDialog(director: object): void {
    console.log('openDirectorDialog: ', director);
  }
  openSynopsisDialog(details: string): void {
    console.log('openSynopsisDialog: ', details);
  }
}
