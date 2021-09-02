import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dsapp-star-initials',
  templateUrl: './star-initials.component.html',
  styleUrls: ['./star-initials.component.scss']
})
export class StarInitialsComponent implements OnInit {
  @Input()
  firstName: string;

  @Input()
  lastName: string;

  initials: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  ngOnInit(): void {
    this.initials = this.getStarInitials();
  }

  private getStarInitials(): string {
    return this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
  }
}
