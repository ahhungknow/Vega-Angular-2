import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import {PaginationComponent  } from './shared/pagination.component';

import { VehicleService } from './services/vehicle.service';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,//.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '',redirectTo:'vehicles', pathMatch: 'full' },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: VehicleFormComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    VehicleService,
    {
      provide: ErrorHandler,
      useClass:AppErrorHandler
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
