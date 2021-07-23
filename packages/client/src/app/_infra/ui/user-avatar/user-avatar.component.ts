import { Component, OnInit, Input } from '@angular/core';
import { Auth } from 'aws-amplify';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.less']
})
export class UserAvatarComponent implements OnInit {
  public showInitials = false;

  public initials: string;

  public circleColor: string;

  public fullName: string;

  public userName: string;

  async ngOnInit(): Promise<void> {
    await Auth.currentUserInfo().then((loggedInUser) => {
      this.fullName = this.extractFullName(loggedInUser);
      this.userName = this.extractUserName(loggedInUser);
    });

    this.createInititals();

    this.circleColor = '#EAEAEA';
  }

  private createInititals(): void {
    const names = this.fullName.split(' ');
    this.initials = names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }

  private extractFullName(loggedInUser): string {
    const fullName:
      | string
      | undefined = `${loggedInUser.attributes.given_name} ${loggedInUser.attributes.family_name}`;

    return fullName;
  }

  private extractUserName(loggedInUser): string {
    const { email } = loggedInUser.attributes;

    return email?.split('@')[0];
  }
}
