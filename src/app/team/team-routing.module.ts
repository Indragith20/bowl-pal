import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { HomeComponent } from './home/home.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { TeamReportsComponent } from './team-reports/team-reports.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { HomeResolver } from './resolvers/home.resolver';
import { AddTeamComponent } from './add-team/add-team.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayerListResolver } from './resolvers/player-list.resolver';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamResolver } from './resolvers/team.resolver';
import { PlayerProfileResolver } from './resolvers/player-profile.resolver';
import { OrderSelectComponent } from './order-select/order-select.component';
import { MainSessionComponent } from './main-session/main-session.component';
import { SessionResolver } from './resolvers/session.resolver';

const routes: Routes = [{
    path: '',
    component: MainPageComponent,
    children: [{
      path: 'home',
      component: HomeComponent
    }, {
      path: 'manageteam',
      component: TeamManagementComponent,
      children: [{
        path: 'home',
        component: ManageTeamComponent
      }, {
        path: 'add-team',
        component: AddTeamComponent
      }, {
        path: 'player-list/:teamId',
        runGuardsAndResolvers: 'always',
        component: PlayerListComponent,
        resolve: { playerList: PlayerListResolver }
      }, {
        path: 'team/:teamId/player-profile/:playerId',
        component: ProfileComponent,
        resolve: { playerDetails: PlayerProfileResolver }
      }, {
        path: 'add-player/:teamId',
        component: AddPlayerComponent
      }, {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }],
      resolve: { teams: TeamResolver }
    }, {
      path: 'newsession',
      component: NewSessionComponent,
      children: [{
        path: 'order-select',
        component: OrderSelectComponent
      }, {
        path: 'main-session/:sessionId',
        component: MainSessionComponent,
        resolve: {
          sessionDetails: SessionResolver
        }
      }, {
        path: '',
        redirectTo: 'order-select',
        pathMatch: 'full'
      }],
      resolve: { teams: TeamResolver }
    }, {
      path: 'reports',
      component: TeamReportsComponent
    }, {
      path: 'profile',
      component: CoachProfileComponent
    }, {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }],
    resolve: { user: HomeResolver },
    runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule { }
