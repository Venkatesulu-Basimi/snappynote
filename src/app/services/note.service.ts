import { Injectable } from '@angular/core';

export interface Note {
  id: string;
  title: string;
  content: string;
  // latitude?: number; // Optional latitude property
  // longitude?: number; // Optional longitude property
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];

  constructor() { }

  public getNotes(): Note[] {
    return this.notes;
  }

  public getNote(id: string): Note | null {
    const note = this.notes.find(note => note.id === id);
    return note ? note : null;
  }
  public updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
    }
  }

  public createNote(title: string, content: string): void {
    const newNote: Note = {
      id: Math.random().toString(36).substring(7),
      title,
      content,
      // latitude,
      // longitude,
      timestamp: Date.now()
    };

    this.notes.push(newNote);
  }

  public deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}

