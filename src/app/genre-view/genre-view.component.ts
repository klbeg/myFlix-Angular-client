import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Genre } from '../movie';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss'],
})
export class GenreViewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public genre: Genre) {}

  ngOnInit(): void {}
}
