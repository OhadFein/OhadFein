import { Injectable } from '@angular/core';
import { BaseRestService } from '@core/services/base-rest.service';
import { Observable } from 'rxjs';
import { CreateNoteDto, NoteDto, UpdateNoteDto } from '@danskill/contract';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private baseRestService: BaseRestService) {}

  getNote(noteId: string): Observable<NoteDto> {
    return this.baseRestService.get<NoteDto>(`notes/single/${noteId}`);
  }

  updateNote(noteId: string, title: string, content: string): Observable<NoteDto> {
    const updateNoteDto = new UpdateNoteDto(title, content);

    return this.baseRestService.patch<NoteDto>(`notes/${noteId}`, updateNoteDto);
  }

  deleteNote(noteId: string): Observable<void> {
    return this.baseRestService.delete<void>(`notes/${noteId}`);
  }

  createNote(practiceId: string, title: string, content: string): Observable<NoteDto> {
    const createNoteDto = new CreateNoteDto(title, content);

    return this.baseRestService.post<NoteDto>(`notes/${practiceId}`, createNoteDto);
  }
}
