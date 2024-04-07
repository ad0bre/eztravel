import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProfileComponent } from './profile/profile.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'search_results',
        component: SearchResultsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'vendor-home',
        component: VendorHomeComponent
    },
    {
        path: 'vendor-profile',
        component: VendorProfileComponent
    }
];
