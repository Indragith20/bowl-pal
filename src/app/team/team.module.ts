import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TeamRoutingModule } from './team-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { HomeComponent } from './home/home.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { TeamReportsComponent } from './team-reports/team-reports.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { HomeResolver } from './resolvers/home.resolver';
import { TeamService } from './services/team.service';
import { AddTeamComponent } from './add-team/add-team.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerListResolver } from './resolvers/player-list.resolver';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamResolver } from './resolvers/team.resolver';
import { PlayerProfileResolver } from './resolvers/player-profile.resolver';
import { OrderSelectComponent } from './order-select/order-select.component';
import { MainSessionComponent } from './main-session/main-session.component';
import { SessionResolver } from './resolvers/session.resolver';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainPageComponent,
    HomeComponent,
    ManageTeamComponent,
    NewSessionComponent,
    TeamReportsComponent,
    CoachProfileComponent,
    PlayerListComponent,
    AddTeamComponent,
    AddPlayerComponent,
    TeamManagementComponent,
    OrderSelectComponent,
    MainSessionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TeamRoutingModule,
    SharedModule
  ],
  providers: [
    HomeResolver,
    TeamResolver,
    PlayerListResolver,
    PlayerProfileResolver,
    SessionResolver,
    TeamService
  ]
})
export class TeamModule { }
