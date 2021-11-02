import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { Auth } from 'aws-amplify';
import { UserDto } from '@danskill/contract';
import { Router } from '@angular/router';

@Component({
  selector: 'dsapp-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.scss']
})
export class ContactUsPageComponent implements OnInit {
  name: string;

  email: string;

  subject: string;

  message: string;

  subjects: string[] = ['Technichal Assitance', 'Other'];

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.initContactUsPage();
  }

  onMessageChange(value: string): void {
    this.message = value;
  }

  onSubjectChange(value: string): void {
    this.subject = value;
  }

  async sendMessage(): Promise<void> {
    // TODO Impl. sending a contact message
  }

  private async initContactUsPage(): Promise<void> {
    this.userService
      .getUser()
      .pipe(
        map((user: UserDto) => {
          this.name = `${user.firstName} ${user.lastName}`;
        })
      )
      .subscribe();

    await Auth.currentUserInfo().then((loggedInUser) => {
      this.email = loggedInUser.attributes.email;
    });
  }
}
