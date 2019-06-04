import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-settings',
  templateUrl: './goal-settings.component.html',
  styleUrls: ['./goal-settings.component.scss'],
})
export class GoalSettingsComponent implements OnInit {
  showBasicView: boolean = true;
  goals: any = {
    basic: {
      deliveries: '50',
      goodLength: '20',
      fullLength: '10',
      shortLength: '20'
    },
    intermediate: {
      deliveries: '75',
      goodLength: '30',
      fullLength: '15',
      shortLength: '30'
    },
    professional: {
      deliveries: '100',
      goodLength: '50',
      fullLength: '15',
      shortLength: '35'
    }
  };
  selectedGoal: any;
  selectedLevel: string = '';
  criteria: string[] = ['Deliveries', 'Good Length', 'Full Length', 'Short Length'];

  constructor() { }

  ngOnInit() {}

  segmentChanged(event) {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    if (selectedValue === 'basic') {
      this.showBasicView = true;
    } else {
      this.showBasicView = false;
    }
  }

  onSelectChange(event) {
    console.log(event.target.value);
    this.selectedLevel = event.target.value;
    this.selectedGoal = this.goals[event.target.value];
  }
}
