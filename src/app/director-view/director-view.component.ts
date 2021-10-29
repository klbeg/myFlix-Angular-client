import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
export class DirectorViewComponent implements OnInit {
  //  I assume I should be able to write "director: object", but I get errors
  constructor(@Inject(MAT_DIALOG_DATA) public director: any) {}

  ngOnInit(): void {}
}
