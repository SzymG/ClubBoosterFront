import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomePageModule',
    },
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginPageModule',
    },
    {
        path: 'register',
        loadChildren: './pages/register/register.module#RegisterPageModule',
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
    {
        path: 'club/:id',
        loadChildren: './pages/club/club-dashboard/club-dashboard.module#ClubDashboardPageModule',
        canActivate: [AuthGuardService],
    },
    {
        path: 'club/:id/list',
        loadChildren: './pages/club/member-list/member-list.module#MemberListPageModule',
        canActivate: [AuthGuardService],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
