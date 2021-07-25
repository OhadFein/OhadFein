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

  selectedCoach: UserBaseDto;

  email: string;

  allCoaches: CoachDto[];

  testCoach = new CoachDto('some slug', 'sub');

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.userService
      .getUser()
      .pipe(
        map((user: UserDto) => {
          this.slug = user.slug;
          this.selectedCoach = user.coach;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
        })
      )
      .subscribe();

    this.userService
      .getAllCoaches()
      .pipe(
        map((coaches: CoachDto[]) => {
          this.allCoaches = coaches;
          if (coaches.length === 0) {
            // just for tests, remove after we have dummy data
            this.allCoaches = [this.testCoach];
          }
        })
      )
      .subscribe();

    await Auth.currentUserInfo().then((loggedInUser) => {
      this.email = loggedInUser.attributes.email;
    });
  }
}
