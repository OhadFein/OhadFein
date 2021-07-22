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
  public fullName : string;
  public userName : string;

  async ngOnInit() {
    await Auth.currentUserInfo().then((loggedInUser) => {
        this.fullName= this.extractFullName(loggedInUser)
        this.userName = this.extractUserName(loggedInUser)
    })

    this.createInititals();

    this.circleColor = '#EAEAEA';
  }

  private createInititals(): void {
    console.log("Name is:" + this.fullName)
    let initials = '';

    for (let i = 0; i < this.fullName.length; i++) {
      if (this.fullName.charAt(i) === ' ') {
        continue;
      }

      if (this.fullName.charAt(i) === this.fullName.charAt(i).toUpperCase()) {
        initials += this.fullName.charAt(i);

        if (initials.length == 2) {
          break;
        }
      }
    }
    console.log("Initials are: " + initials)
    this.initials = initials;
  }

  private extractFullName(loggedInUser): string {
    const fullName: string | undefined =
      loggedInUser.attributes.given_name + " " + loggedInUser.attributes.family_name;
    console.log("Returning " + fullName)
    return fullName;
  }

  extractUserName(loggedInUser): string {
    const email: string | undefined = loggedInUser.attributes.email;

    return email?.split('@')[0];
  }

}
