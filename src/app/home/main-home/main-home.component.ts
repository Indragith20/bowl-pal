import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
})
export class MainHomeComponent implements OnInit {
  balls: any[] = [
    {
      ball: 'Good',
      number: 40
    },
    {
      ball: 'Short',
      number: 20
    },
    {
      ball: 'Over',
      number: 30
    },
    {
      ball: 'Full',
      number: 10
    }
  ];


  constructor(public platform: Platform, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goToGoalComparsionPage() {
    this.router.navigate(['home/goal-comparsion'], { relativeTo: this.route.parent});
  }

  goToStartSession() {
    this.router.navigate(['home/pitch-map']);
  }

  goToGoalSettingsPage() {
    this.router.navigate(['home/goal-settings'], { relativeTo: this.route.parent});
  }

  goToAddNotePage() {
    this.router.navigate(['home/add-note']);
  }

}
