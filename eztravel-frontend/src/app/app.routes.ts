import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VendorHomeComponent } from './components/vendor-home/vendor-home.component';
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { MyTripsComponent } from './components/my-trips/my-trips.component';

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
    },
    {
        path: 'trips',
        component: MyTripsComponent
    }
];
