import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Username: '',
    Birthdate: '',
    NewPassword: '',
    ConfirmPassword: '',
  };

  user: any = {};
  token: string = '';
  constructor(public fetchApiData: UserRegistrationService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (typeof user === 'string') {
      const parse = JSON.parse(user);
      this.user = parse;
    }

    const token: any = localStorage.getItem('token');
    this.token = token;
  }

  log = (x: any) => {
    console.log(x);
  };
}
