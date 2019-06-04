import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MainHomeComponent } from './main-home/main-home.component';
import { GoalComparsionComponent } from './goal-comparsion/goal-comparsion.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { PitchMapComponent } from './pitch-map/pitch-map.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { GoalSettingsComponent } from './goal-settings/goal-settings.component';
import { AddNoteComponent } from './add-note/add-note.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }, {
        path: 'goal-comparsion',
        component: GoalComparsionComponent
      }, {
        path: 'pitch-map',
        component: PitchMapComponent
      }, {
        path: 'profile',
        component: ProfileComponent
      }, {
        path: 'goal-settings',
        component: GoalSettingsComponent
      }, {
        path: 'add-note',
        component: AddNoteComponent
      }
    ])
  ],
  declarations: [
    ProgressBarComponent,
    HomePage,
    MainHomeComponent,
    GoalComparsionComponent,
    PitchMapComponent,
    GoalSettingsComponent,
    AddNoteComponent
  ]
})
export class HomePageModule {}
