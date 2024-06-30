import { Component, signal } from '@angular/core';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { DndDirective } from '../../common-ui/directives/dnd.directive';

@Component({
  selector: 'avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './settings-page-upload.component.html',
  styleUrl: './settings-page-upload.component.scss'
})
export class SettingsPageUploadComponent {

preview = signal<string>('https://cdn-icons-png.flaticon.com/512/3135/3135715.png')

avatar: File | null = null

fileBrowserHandler($event: Event) {
const file = (event?.target as HTMLInputElement)?.files?.[0]
this.processFile(file)

}

onFileDroped(file: File){
  this.processFile(file)
}
processFile(file: File | null | undefined){
  if (!file || !file.type.match ('image')) {
    return;
  }
  else {
    const reader = new FileReader()
    reader.onload = event => {
     this.preview.set(event.target?.result?.toString() ?? '')
    }
    reader.readAsDataURL(file)
    this.avatar = file;
  }
}
}
