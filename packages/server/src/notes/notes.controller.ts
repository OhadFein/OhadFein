import { Controller, Post, Body, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
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
  @UseInterceptors(new TransformInterceptor(NoteDto))
  create(
    @RequestUser() user: User,
    @Body() createNoteDto: CreateNoteDto,
    @Param('practiceId') practiceId: Types.ObjectId,
  ) {
    return this.notesService.create(user, practiceId, createNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    const deletedNote = this.notesService.remove(id);
    if (!deletedNote) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return;
  }
}
