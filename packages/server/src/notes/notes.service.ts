import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { PracticesService } from 'src/practices/practices.service';
import { User } from 'src/users/schemas/user.schema';
import { CreateNoteDto } from '@danskill/contract';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<NoteDocument>,
    @Inject(forwardRef(() => PracticesService))
    private readonly practicesService: PracticesService
  ) {}

  async create(
    user: User,
    practiceId: Types.ObjectId,
    createNoteDto: CreateNoteDto
  ): Promise<Note> {
    // TODO: check user permissions (coach or student)

    const createdNote = new this.noteModel({
      user,
      practice: practiceId,
      title: createNoteDto.title,
      content: createNoteDto.content,
    });

    await createdNote.save();
    await this.practicesService.addNote(createdNote);

    return createdNote;
  }

  async remove(id: Types.ObjectId): Promise<Note> {
    const deletedNote = await this.noteModel.findByIdAndRemove({ _id: id }).exec();
    await this.practicesService.removeNote(deletedNote);

    return deletedNote;
  }
}
