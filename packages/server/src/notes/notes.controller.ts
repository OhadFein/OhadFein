import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Types } from 'mongoose';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { CreateNoteDto } from '@danskill/contract';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post(':practiceId')
  create(
    @RequestUser() user: User,
    @Body() createNoteDto: CreateNoteDto,
    @Param('practiceId') practiceId: Types.ObjectId,
  ) {
    return this.notesService.create(user, practiceId, createNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
