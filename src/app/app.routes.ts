import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuth } from './auth/access.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: SearchPagesComponent },
            { path: 'profile/:id', component: ProfilePageComponent },         
            { path: 'settngs', component: SettingsPageComponent },
        ],
        canActivate: [canActivateAuth]

    },

    { path: 'login', component: LoginComponent },
];
