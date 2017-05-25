import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ButtonModule, PanelModule, InputTextModule, CheckboxModule, DialogModule,
  GrowlModule, DataTableModule, SharedModule, GMapModule } from 'primeng/primeng';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { WorldmapComponent } from './worldmap/worldmap.component';
import { CustomwidgetComponent } from './home/customwidget/customwidget.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DomElementsComponent } from './dashboard/dom-elements/dom-elements.component';
import { LoadTimeComponent } from './dashboard/load-time/load-time.component';
import { TtfbLoadtimeComponent } from './dashboard/ttfb-loadtime/ttfb-loadtime.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertsMapComponent } from './alerts/alerts-map/alerts-map.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftnavComponent,
    WorldmapComponent,
    CustomwidgetComponent,
    DashboardComponent,
    DomElementsComponent,
    LoadTimeComponent,
    TtfbLoadtimeComponent,
    AlertsComponent,
    AlertsMapComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DialogModule,
    AmChartsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'alert',
        component: AlertsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'map',
        component: MapComponent
      },

    ]),
    JsonpModule,
    BrowserAnimationsModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    CheckboxModule,
    GrowlModule,
    ChartsModule,
    DataTableModule,
    SharedModule,
    GMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
