import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-goal-comparsion',
  templateUrl: './goal-comparsion.component.html',
  styleUrls: ['./goal-comparsion.component.scss'],
})
export class GoalComparsionComponent implements OnInit, AfterViewInit {
  @ViewChild('barchart') barchart: any;
  weeks: string[] = [];
  months: String[] = [];
  constructor() {
    this.weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
     'September', 'October', 'November', 'December'];
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.drawBarChart(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
  }

  drawBarChart(labels: string[]) {
    const c = this.barchart.nativeElement;
    const data = {
      labels,
      datasets: [
        {
          label: 'Good',
          backgroundColor: '#FCDAC3',
          borderColor: '#DB5800',
          borderWidth: 2,
          hoverBackgroundColor: '#B8A680',
          hoverBorderColor: '#B8A680',
          data: [65, 59, 20, 81, 56, 55, 40],
        }, {
          label: 'Full',
          backgroundColor: '#E48E8E',
          borderColor: '#E48E8E',
          borderWidth: 2,
          hoverBackgroundColor: '#7FAB70',
          hoverBorderColor: '#7FAB70',
          data: [25, 59, 20, 81, 56, 55, 40],
        }, {
          label: 'Short',
          backgroundColor: '#B2F8A6',
          borderColor: '#67F14F',
          borderWidth: 2,
          hoverBackgroundColor: '#769A8C',
          hoverBorderColor: '#769A8C',
          data: [15, 59, 20, 81, 56, 55, 40],
        }
      ]
    };
    const option = {
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)'
          }
        }],
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false
          }
        }]
      }
    };

    const myBarChart = Chart.Bar(c, {
      data: data,
      options: option
    });

  }


  segmentChanged(event) {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    if(selectedValue === 'months') {
      this.drawBarChart(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
    } else if(selectedValue === 'days') {
      this.drawBarChart(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    } else {
      this.drawBarChart(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    }
  }

}
