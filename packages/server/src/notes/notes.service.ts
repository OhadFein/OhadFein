import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { PracticesService } from 'src/practices/practices.service';
import { User } from 'src/users/schemas/user.schema';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from '@danskill/contract';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<NoteDocument>,
    @Inject(forwardRef(() => PracticesService))
    private readonly practicesService: PracticesService,
  ) {}

  async create(
    user: User,
    practiceId: Types.ObjectId,
    createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    // TODO: check user permissions (coach or student)

    const createdNote = new this.noteModel({
      user: user,
      practice: practiceId,
      title: createNoteDto.title,
      content: createNoteDto.content,
    });

    await createdNote.save();
    await this.practicesService.addNote(createdNote);

    return createdNote;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
