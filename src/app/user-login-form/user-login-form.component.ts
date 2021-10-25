import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData
      .userLogin(this.userData.Username, this.userData.Password)
      .subscribe(
        (result) => {
          console.log('result.user: ', result.user);
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          //  closes modal on success
          this.dialogRef.close();
          this.snackBar.open('Login successful.  Welcome!', 'OK', {
            duration: 2000,
          });
        },
        (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000,
          });
        }
      );
  }
}