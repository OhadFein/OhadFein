import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { PracticesService } from 'src/practices/practices.service';
import { User } from 'src/users/schemas/user.schema';
import { CreateNoteDto, UpdateNoteDto, EnumNotificationType } from '@danskill/contract';
import { EnumNotificationLinkedModel } from 'src/common/enums/notification-linked-model.enum';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<NoteDocument>,
    @Inject(forwardRef(() => PracticesService))
    private readonly practicesService: PracticesService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => NotificationsService))
    private readonly notificationsService: NotificationsService
  ) {}

  async create(
    user: User,
    practiceId: Types.ObjectId,
    createNoteDto: CreateNoteDto
  ): Promise<Note> {
    // TODO: check user permissions (coach or student)
    let sender: Types.ObjectId;
    let receiver: Types.ObjectId;

    const practice = await this.practicesService.findOne(practiceId);
    if (practice.user.equals(user._id)) {
      // user note
      sender = user._id;
      receiver = user.coach;
    } else {
      // coach note
      sender = user.coach;
      receiver = user._id;
    }

    const createdNote = new this.noteModel({
      user,
      practice: practiceId,
      title: createNoteDto.title,
      content: createNoteDto.content
    });

    await createdNote.save();
    await this.practicesService.addNote(createdNote);

    const notification = await this.notificationsService.build(
      [sender],
      [receiver],
      EnumNotificationType.NewNote,
      EnumNotificationLinkedModel.Note,
      practiceId
    );

    await notification.save();
    await this.usersService.addNotification(receiver, notification);

    return createdNote;
  }

  async update(id: Types.ObjectId, updateNoteDto: UpdateNoteDto): Promise<Note> {
    // TODO: check permissions
    const note = await this.noteModel
      .findByIdAndUpdate(
        id,
        { title: updateNoteDto.title, content: updateNoteDto.content },
        { new: true }
      )
      .exec();

    return note;
  }

  async remove(id: Types.ObjectId): Promise<Note> {
    const deletedNote = await this.noteModel.findByIdAndRemove({ _id: id }).exec();
    await this.practicesService.removeNote(deletedNote);

    return deletedNote;
  }
}
