import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';
import { AlertController } from '@ionic/angular';
//import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Note } from '../services/note.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  notes: any[]; // Declare the notes array
  themeClass: string = 'light-theme'; // Add the themeClass variable
  filterText: string = '';
  sortCriteria: { field: string; order: 'asc' | 'desc' } = { field: 'timestamp', order: 'desc' };
  

  constructor(
    public noteService: NoteService,
    private alertController: AlertController,
    //private geolocation: Geolocation, // Inject the Geolocation service
    private vibration: Vibration
  ) {
    this.notes = this.noteService.getNotes(); // Initialize the notes array with data from the service
  }
  toggleTheme() {
    this.themeClass = this.themeClass === 'light-theme' ? 'dark-theme' : 'light-theme';
  }
  async addNote() {
    const alert = await this.alertController.create({
      header: 'New Note',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title'
        },
        {
          name: 'content',
          type: 'textarea',
          placeholder: 'Content'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (data) => {
            // Get the current position
            // const position = await this.getCurrentPosition();
            // const latitude = position.coords.latitude;
            // const longitude = position.coords.longitude;

            this.noteService.createNote(data.title, data.content);
              // Vibrate for 500 milliseconds
            this.vibration.vibrate(500);
          }
        }
      ]
    });

    await alert.present();
  }
  async editNote(note: Note) {
    const alert = await this.alertController.create({
      header: 'Edit Note',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title',
          value: note.title
        },
        {
          name: 'content',
          type: 'textarea',
          placeholder: 'Content',
          value: note.content
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Save',
          handler: async (data) => {
            const updatedNote: Note = {
              ...note,
              title: data.title,
              content: data.content
            };
            this.noteService.updateNote(updatedNote);
            this.notes = this.noteService.getNotes(); // Update the notes array after editing a note
          }
        }
      ]
    });
  
    await alert.present();
  }
  // async getCurrentPosition(): Promise<Geoposition> {
  //   const options: GeolocationOptions = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   };

  //   try {
  //     const position: Geoposition = await this.geolocation.getCurrentPosition(options);
  //     return position;
  //   } catch (error) {
  //     console.log('Error getting location', error);
  //     throw error;
  //   }
  // }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes(); // Update the notes array after deleting a note
  }
  sortNotes() {
    this.notes.sort((a, b) => {
      if (a[this.sortCriteria.field] < b[this.sortCriteria.field]) return this.sortCriteria.order === 'asc' ? -1 : 1;
      if (a[this.sortCriteria.field] > b[this.sortCriteria.field]) return this.sortCriteria.order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  filterNotes() {
    this.notes = this.noteService.getNotes().filter((note) =>
      note.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.sortNotes();
  }
}