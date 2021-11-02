import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteBaseDto } from '@danskill/contract';

@Component({
  selector: 'dsapp-notes-list-preview',
  templateUrl: './notes-list-preview.component.html',
  styleUrls: ['./notes-list-preview.component.scss']
})
export class NotesListPreviewComponent {
  @Input()
  notes: NoteBaseDto[];

  @Output()
  addNote = new EventEmitter<void>();

  @Output()
  editNote = new EventEmitter();

  onEditNote(note: NoteBaseDto): void {
    this.editNote.emit({ noteId: note._id });
  }
}
