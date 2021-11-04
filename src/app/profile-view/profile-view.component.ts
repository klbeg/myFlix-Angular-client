import { Component, Inject, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Username: '',
    Email: '',
    Birthdate: '',
  };
  @Input() updatePass = {
    Password: '',
  };

  user: any = {};
  token: string = '';
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar
  ) {}

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

  onUpdateUserInfo = () => {
    const updateArr = Object.entries(this.userData);
    let filteredArr = updateArr.filter((item) => item[1].length);
    let filteredObj = Object.fromEntries(filteredArr);

    this.fetchApiData.editUserInfo(this.user.Username, filteredObj).subscribe(
      (result) => {
        this.user = result;

        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('User info updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  };

  onUpdatePassword = () => {
    let pass: object = { Password: this.updatePass.Password };

    this.fetchApiData.updatePassword(this.user.Username, pass).subscribe(
      () => {
        this.snackBar.open('Password updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  };

  onDeleteUser = () => {
    this.fetchApiData.deleteUser(this.user.Username).subscribe(
      () => {
        this.snackBar.open(
          'User account deleted.  Sorry to see you go :(',
          'OK',
          { duration: 2000 }
        );
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  };
}
