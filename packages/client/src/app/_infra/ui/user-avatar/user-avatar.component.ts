import { UserService } from '@core/services';
import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() showFullName: boolean = true;

  @Input() showSlug: boolean = true;

  constructor(private userService: UserService) {}

  public initials: string;

  public circleColor: string;

  public fullName: string;

  public userName: string;

  async ngOnInit(): Promise<void> {
    await Auth.currentUserInfo().then((loggedInUser) => {
      this.fullName = this.extractFullName(loggedInUser);
    });

    this.userName = await this.getUsername();

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

  private async getUsername(): Promise<string> {
    const user = await this.userService.getUser().toPromise();

    return user.slug;
  }
}
