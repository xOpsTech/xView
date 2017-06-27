import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ButtonModule, PanelModule, InputTextModule, CheckboxModule, DialogModule,
  GrowlModule, DataTableModule, SharedModule, GMapModule, SelectButtonModule, AccordionModule, SliderModule, ChartModule } from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts';
import { AsideToggleDirective } from '../shared/aside.directive';
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
import { WidgetHomeComponent } from './widgethome/widgethome.component';
import { MapComponent } from './map/map.component';
import { IncidentComponent } from './business-insights/incident/incident.component';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../shared/sidebar.directive';
import { NAV_DROPDOWN_DIRECTIVES } from '../shared/nav-dropdown.directive';
import { BusinessInsightsComponent } from './business-insights/business-insights.component';
import { SnowAggsService } from './services/snow-aggs.service';
import { IncidentService } from './services/incident.service';
import { SettingsComponent } from './settings/settings.component';
import { UserService } from './services/user.service';
import { RssfeedService } from './services/rssfeed.service';
import { RssfeedComponent } from './widgets/rssfeed/rssfeed.component';
import { Select2Module } from 'ng2-select2';
import { SlimScrollModule } from 'ng2-slimscroll';

import { TruncatePipe } from './common/pipe.truncate';

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
    WidgetHomeComponent,
    MapComponent,

    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    BusinessInsightsComponent,
    IncidentComponent,
    RssfeedComponent,
    SettingsComponent,
    TruncatePipe
],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DialogModule,
    AmChartsModule,
    Select2Module,
    SlimScrollModule,


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
        path: 'custom/dashboard',
        component: DashboardComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'tech/incident',
        component: IncidentComponent
      },
      {
        path: 'tech/third-party',
        component: RssfeedComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'custom/cc',
        component: WidgetHomeComponent
      },
      {
        path: '', redirectTo: 'custom/cc', pathMatch: 'full'
      }


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
    GMapModule,
    SelectButtonModule,
    AccordionModule,
    SliderModule,
    ChartModule
  ],
  providers: [SnowAggsService, UserService, RssfeedService, IncidentService],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
