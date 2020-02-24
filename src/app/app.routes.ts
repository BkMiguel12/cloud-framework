import { Routes, RouterModule } from '@angular/router';

import { LoanFormComponent } from './loan-form/loan-form.component';
import { NotFoundComponent } from './not-found/not-found.component';


const appRoutes: Routes = [
    { path: 'not_found', component: NotFoundComponent },
    { path: 'partner_test', redirectTo: 'not_found' },
    { path: 'partner_test/:id', component: LoanFormComponent },
    { path: '', redirectTo: '/not_found', pathMatch: 'full' }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
