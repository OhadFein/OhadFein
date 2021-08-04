import { finalize, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { Auth } from 'aws-amplify';
import { UserDto, CoachDto } from '@danskill/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'dsapp-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styleUrls: ['./student-profile-page.component.scss']
})
export class StudentProfilePageComponent implements OnInit {
  slug: string;

  firstName: string;

  lastName: string;

  coach: string;

  email: string;

  allCoaches: string[];

  newFirstName: string;

  newLastName: string;

  newCoach: string;

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.initProfilePage();
  }

  onFirstNameChange(value: string): void {
    this.newFirstName = value;
  }

  onLastNameChange(value: string): void {
    this.newLastName = value;
  }

  onCoachChange(value: string): void {
    this.newCoach = value;
  }

  async saveChanges(): Promise<void> {
    await this.userService
      .updateUserDetails(this.newFirstName, this.newLastName, this.newCoach)
      .pipe(finalize(() => window.location.reload()))
      .subscribe();
    // Make a loader instead of reloading the page
  }

  private async initProfilePage(): Promise<void> {
    this.userService
      .getUser()
      .pipe(
        map((user: UserDto) => {
          this.slug = user.slug;
          this.coach = user.coach ? user.coach.slug : '';
          this.firstName = user.firstName;
          this.lastName = user.lastName;
        })
      )
      .subscribe();

    this.userService
      .getAllCoaches()
      .pipe(
        map((coaches: CoachDto[]) => {
          this.allCoaches = coaches.map((coach) => coach.slug);
        })
      )
      .subscribe();

    await Auth.currentUserInfo().then((loggedInUser) => {
      this.email = loggedInUser.attributes.email;
    });
  }
}
