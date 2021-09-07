import { Injectable } from '@angular/core';
import { BaseRestService } from '@core/services/base-rest.service';
import { Observable } from 'rxjs';
import { CreateNoteDto, NoteBaseDto } from '@danskill/contract';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private baseRestService: BaseRestService) {}

  getNote(noteId: string): Observable<NoteBaseDto> {
    // TODO impl when server is ready
  }

  updateNote(noteId: string, title: string, content: string): Observable<void> {
    // TODO impl when server is ready
  }

  deleteNote(noteId: string): Observable<void> {
    return this.baseRestService.delete<void>(`notes/${noteId}`);
  }

  createNote(practiceId: string, title: string, content: string): Observable<NoteBaseDto> {
    const createNoteDto = new CreateNoteDto(title, content);

    return this.baseRestService.post<NoteBaseDto>(`notes/${practiceId}`, createNoteDto);
  }
}
