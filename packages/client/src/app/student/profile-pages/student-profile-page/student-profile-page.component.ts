import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { Auth } from 'aws-amplify';
import { UserDto, CoachDto } from '@danskill/contract';
import { UserBaseDto } from '../../../../../../contract/src/users/user-base.dto';

@Component({
  selector: 'dsapp-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styleUrls: ['./student-profile-page.component.less']
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

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.initProfilePage();
  }

  onFirstNameChange(value: string): void {
    this.newFirstName = value;
  }

  onLastNameChange(value: string): void {
    this.newLastName = value;
  }

  async saveChanges(): Promise<void> {
    await this.userService
      .updateUserDetails(this.newFirstName, this.newLastName, this.coach)
      .subscribe();
  }

  private async initProfilePage(): Promise<void> {
    this.userService
      .getUser()
      .pipe(
        map((user: UserDto) => {
          this.slug = user.slug;
          this.coach = user.coach.slug;
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
