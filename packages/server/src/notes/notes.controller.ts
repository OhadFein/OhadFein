import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Patch
} from '@nestjs/common';
import { Types } from 'mongoose';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { CreateNoteDto, UpdateNoteDto, NoteDto } from '@danskill/contract';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
// import { ApiBody } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // @ApiBody({ type: CreateNoteDto })
  @Post(':practiceId')
  @UseInterceptors(new TransformInterceptor(NoteDto))
  create(
    @RequestUser() user: User,
    @Body() createNoteDto: CreateNoteDto,
    @Param('practiceId') practiceId: Types.ObjectId
  ): Promise<Note> {
    return this.notesService.create(user, practiceId, createNoteDto);
  }

  @Patch(':id')
  @UseInterceptors(new TransformInterceptor(NoteDto))
  async remove(
    @Param('id') id: Types.ObjectId,
    @Body() updateNoteDto: UpdateNoteDto
  ): Promise<Note> {
    console.log('here');
    const updatedNote = await this.notesService.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return updatedNote;
  }

  @Delete(':id')
  async update(@Param('id') id: Types.ObjectId): Promise<void> {
    const deletedNote = await this.notesService.remove(id);
    if (!deletedNote) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }
  }
}
