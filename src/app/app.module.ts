import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { FileSelectDirective } from 'ng2-file-upload';
import {
  ButtonModule, PanelModule, InputTextModule, CheckboxModule, DialogModule, AutoCompleteModule,
  GrowlModule, DataTableModule, SharedModule, OverlayPanelModule, GMapModule, SelectButtonModule, DropdownModule, AccordionModule, SliderModule, ChartModule, DataGridModule, SpinnerModule, FileUploadModule
} from 'primeng/primeng';
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
import { StepsModule } from 'primeng/primeng';
import { TruncatePipe } from './common/pipe.truncate';
import { LoginComponent } from './login/login.component';
import { BusinessComponent } from './business/business.component';
import { BreadcrumbsComponent } from '../shared/breadcrumb.component';
import { CircleProgressComponent } from '../shared/circle-progress.component';
import { MatchHeightDirective } from '../shared/match-height.directive';
import { XviewTemplateComponent } from './xview-template/xview-template.component';
import { AlertIndividualComponent } from './alerts/alert-individual/alert-individual.component';
import { SignupComponent } from './signup/signup.component';
import { ItemSettingsComponent } from './item-settings/item-settings.component';
import { StatusComponent } from './status/status.component';
import { ManageComponent } from './manage/manage.component';
import { ListboxModule } from 'primeng/primeng';
import { LogsearchComponent } from './logsearch/logsearch.component';
import { CustomComponent } from './custom/custom.component';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule } from "angular4-social-login";
import { AuthServiceConfig} from 'angular4-social-login';
import {GoogleLoginProvider} from 'angular4-social-login';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {UserManageComponent} from "./userManager/user-manage.component";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1097768545835-cr04oqb5at81e517jge5lfgmos3pcs0t.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}



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
    FileSelectDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    BusinessInsightsComponent,
    IncidentComponent,
    RssfeedComponent,
    SettingsComponent,
    TruncatePipe,
    LoginComponent,
    BusinessComponent,
    BreadcrumbsComponent,
    CircleProgressComponent,
    MatchHeightDirective,
    XviewTemplateComponent,
    AlertIndividualComponent,
    SignupComponent,
    AlertIndividualComponent,
    SignupComponent,
    ItemSettingsComponent,
    StatusComponent,
    StatusComponent,
    ManageComponent,
    LogsearchComponent,
    CustomComponent,
    ProfileComponent,
    UserManageComponent
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
    AutoCompleteModule,
    StepsModule,
    ListboxModule,
    SocialLoginModule,
    MessagesModule,
    ConfirmDialogModule,

    RouterModule.forRoot([
      {
        path: 'signup',
        component: SignupComponent,

      },
      {
        path:'login',
        component:LoginComponent,

      },
      {
        path: '',
        component: XviewTemplateComponent,
       canActivate: [AuthGuard],
        children: [
          {
            path: 'home',
            component: HomeComponent

          },
          {
            path: 'alert',
            component: AlertsComponent
          },
          // {
          //   path: 'custom/dashboard',
          //   component: DashboardComponent
          // },
          {
            path: 'map',
            component: MapComponent
          },
          {
            path: 'tech',
            component: BusinessInsightsComponent
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
            path: 'manage',
            component: ManageComponent
          },
          // {
          //   path: 'custom/cc',
          //   component: WidgetHomeComponent
          // },
          {
            path: 'business',
            component: BusinessComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'alertindividual',
            component: AlertIndividualComponent
          },
          {
            path: 'itemSettings',
            component: ItemSettingsComponent
          },
          {
            path: 'logSearch',
            component: LogsearchComponent
          },
          {
            path: 'status',
            component: StatusComponent
          },
          {
            path: 'custom',
            component: CustomComponent
          },
          {
            path:'profile',
            component:SettingsComponent
          },
          {
            path:'user-manage',
            component:UserManageComponent,
          },
          {
            path: '**', redirectTo: '', pathMatch: 'full'
          }

        ]
      }
    ], { useHash: true }),
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
    ChartModule,
    DropdownModule,
    SpinnerModule,
    OverlayPanelModule,
    DataGridModule,
    FileUploadModule
  ],
  providers: [AuthService,AuthGuard,SnowAggsService, UserService, RssfeedService, IncidentService,{ provide: AuthServiceConfig,useFactory: provideConfig}],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule {}
