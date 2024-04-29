import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Camera, File]
})
export class Tab2Page {
  imageUrl: string;
  constructor(
    private camera: Camera,
  private file: File
  ) {
      this.imageUrl = ''; // Initialize the imageUrl property
  }
  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
  
    try {
      const imageData = await this.camera.getPicture(options);
      const fileName = `${new Date().getTime()}.jpg`;
      const directory = this.file.dataDirectory;
      await this.file.copyFile(this.file.tempDirectory, imageData.split('/').pop(), directory, fileName);
      console.log(`Image saved to: ${directory}${fileName}`);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }
}
