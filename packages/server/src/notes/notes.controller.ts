import { Controller, Post, Body, Param, Delete, UseInterceptors } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Types } from 'mongoose';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { CreateNoteDto, NoteDto } from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post(':practiceId')
  @UseInterceptors(new TransformInterceptor(NoteDto)) // TODO: NoteDto or NoteBaseDto?
  create(
    @RequestUser() user: User,
    @Body() createNoteDto: CreateNoteDto,
    @Param('practiceId') practiceId: Types.ObjectId,
  ) {
    return this.notesService.create(user, practiceId, createNoteDto);
  }

  @Delete(':id')
  @UseInterceptors(new TransformInterceptor(NoteDto)) // TODO: NoteDto or NoteBaseDto?
  remove(@Param('id') id: Types.ObjectId) {
    return this.notesService.remove(id);
  }
}
