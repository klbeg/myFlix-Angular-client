import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: [
    './user-registration-form.component.scss',
    '../profile-view/profile-view.component.scss',
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Name: '',
    Username: '',
    Password: '',
    Email: '',
    Birthdate: '',
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  log = (x: any) => {
    console.log(x);
  };

  /**
   * Takes info from registration form and creates a new user in backend
   * displays success as snackbar
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        //  closes modal on success
        this.dialogRef.close();
        this.snackBar.open('User registered successfully!', 'OK', {
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
