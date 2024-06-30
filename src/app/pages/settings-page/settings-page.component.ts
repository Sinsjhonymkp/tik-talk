import { Component, ViewChild, effect, inject, } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder,   ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom, switchMap } from 'rxjs';
import { ProfileService } from '../../data/services/profile.service';
import {AsyncPipe} from "@angular/common";
import { SettingsPageUploadComponent } from "../settings-page-upload/settings-page-upload.component";



@Component({
    selector: 'app-settings-page',
    standalone: true,
    templateUrl: './settings-page.component.html',
    styleUrl: './settings-page.component.scss',
    imports: [ProfileHeaderComponent, AsyncPipe, ReactiveFormsModule, SettingsPageUploadComponent]
})
export class SettingsPageComponent {

    private profileServise = inject(ProfileService);
    
route = inject(ActivatedRoute);
router: Router = inject(Router)
me$ = toObservable(this.profileServise.me) 



profile$ = this.route.params.pipe(
    switchMap(({id}) => {
        if (id === 'me') return this.me$

            return this.profileServise.getAccount("me")
    })
)
fb = inject(FormBuilder)

@ViewChild(SettingsPageUploadComponent) avatarUploader: any
       
    form = this.fb.group({
        firstName:[ '', Validators.required],
        lastName: ['', Validators.required],
        username:  [{value: '', disabled:true}, Validators.required],
        description: [''],
        stack: ['']
    });
    constructor()  {
effect(()=>{
    //@ts-ignore
    this.form.patchValue({
        ...this.profileServise.me(),
        //@ts-ignore
        stack: this.mergeStack(this.profileServise.me()?.stack)
    })
    
})
    }

    ngAfterViewInit()   {
        this.avatarUploader.avatar
    }

    onSave()  {
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
    
    
        if (this.form.invalid) return alert("Не верно заполнена форма");
       
            if (this.avatarUploader.avatar){
                firstValueFrom(this.profileServise.uploadAvatar(this.avatarUploader.avatar))
                console.log(this.avatarUploader.avatar)
            }
            //@ts-ignore
            firstValueFrom(this.profileServise.patchProfile({
                    ...this.form.value,
                    stack: this.splitStack(this.form.value.stack)
                    
                }))
                this.router.navigate(['/profile/me'])
                
               
        
    }
    private splitStack(stack: string | null | string[] | undefined): string[] {
        if (!stack) return []
        if (Array.isArray(stack)) return stack

       return stack.split( ',')
    }
    private mergeStack(stack: string | null | string[] | undefined): string{
        if (!stack) return ''
        if (Array.isArray(stack)) return stack.join(',')

       return stack
    }
}
