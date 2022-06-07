import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PhonesComponent } from './phones/phones.component';
import { PhoneComponent } from './phone/phone.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectedListComponent } from './selected-list/selected-list.component';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
  { path: '', component: PhonesComponent },
  { path: ':id', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    PhoneComponent,
    SelectedListComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
