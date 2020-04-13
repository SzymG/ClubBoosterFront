import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
    {path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule'},
    {path: 'club', loadChildren: './pages/club/club.module#ClubPageModule'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
