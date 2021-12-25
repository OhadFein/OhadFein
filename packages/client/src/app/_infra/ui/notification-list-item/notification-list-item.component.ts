import { NotesService } from '@core/services/notes.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  NotificationDto,
  EnumNotificationType,
  PracticeBaseDto,
  PracticeDto,
  UserBaseDto
} from '@danskill/contract';
import { Router } from '@angular/router';
import { PracticesService } from '@core/services';

@Component({
  selector: 'dsapp-notification-list-item',
  templateUrl: './notification-list-item.component.html',
  styleUrls: ['./notification-list-item.component.scss']
})
export class NotificationListItemComponent implements OnInit {
  constructor(
    private router: Router,
    private notesService: NotesService,
    private practiceService: PracticesService
  ) {}

  @Input()
  notification: NotificationDto;

  @Output()
  readNotification = new EventEmitter<string>();

  notoficationMsg: string;

  relatedPratice: PracticeDto;

  ngOnInit(): void {
    if (this.notification.type === EnumNotificationType.NewNote) {
      this.initNewNoteNotification();
    } else if (this.notification.type === EnumNotificationType.NewPractice) {
      this.initNewPracticeNotification();
    }
  }

  initNewPracticeNotification(): void {
    this.practiceService
      .getPractice(this.notification.linkedId.toString())
      .subscribe((practice) => {
        this.relatedPratice = practice;
        const names = this.notification.senders.map((user) => this.getDisplayName(user));

        this.notoficationMsg = `${names.join(', ')} ${
          names.length === 1 ? 'has' : 'have'
        } uploaded a new practice for ${this.relatedPratice.figure.name}`;
      });
  }

  initNewNoteNotification(): void {
    this.notesService.getNote(this.notification.linkedId.toString()).subscribe((note) => {
      this.practiceService.getPractice(note.practice._id.toString()).subscribe((practice) => {
        const names = this.notification.senders.map((user) => this.getDisplayName(user));

        this.relatedPratice = practice;
        this.notoficationMsg = `${names.join(', ')} left a note on your video for ${
          this.relatedPratice.figure.name
        }`;
      });
    });
  }

  getDisplayName(user: UserBaseDto): string {
    let displayName = '';

    if (user.firstName && user.lastName) {
      displayName = `${user.firstName} ${user.lastName}`;
    } else {
      displayName = user.slug;
    }

    return displayName;
  }

  onReadNotification(): void {
    this.readNotification.emit(this.relatedPratice._id.toString());
  }
}
