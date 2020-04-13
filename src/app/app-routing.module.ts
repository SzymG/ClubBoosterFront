import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuestGuardService} from './services/guest-guard.service';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomePageModule',
        canActivate: [GuestGuardService]
    },
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginPageModule',
        canActivate: [GuestGuardService]
    },
    {
        path: 'register',
        loadChildren: './pages/register/register.module#RegisterPageModule',
        canActivate: [GuestGuardService]
    },
    {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfilePageModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'club',
        loadChildren: './pages/club/club.module#ClubPageModule',
        canActivate: [AuthGuardService]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
