import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  /**
   * Removes token and user from localStorage
   */
  signOutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
