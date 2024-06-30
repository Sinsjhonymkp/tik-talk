import { Component, Input } from '@angular/core';
import { Iprofile } from '../../../data/interfaces/profile.interface';
import { ImgUrlPipe } from "../../../helpers/pipes/img-url.pipe";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-subscriber-card',
    standalone: true,
    templateUrl: './subscriber-card.component.html',
    styleUrl: './subscriber-card.component.scss',
    imports: [ImgUrlPipe, RouterModule]
})
export class SubscriberCardComponent {
@Input() profile!: Iprofile;
}
