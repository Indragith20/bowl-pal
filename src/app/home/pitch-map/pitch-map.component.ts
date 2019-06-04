import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-pitch-map',
  templateUrl: './pitch-map.component.html',
  styleUrls: ['./pitch-map.component.scss'],
})
export class PitchMapComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: any;
  name = 'Angular';
  coordinates: any;
  constructor(private cd: ChangeDetectorRef, public actionSheetController: ActionSheetController) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.drawScatterChart();
  }

  drawScatterChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const plugin = {
      beforeDraw: function (chart, easing) {
        let ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;
        console.log(chart);
        ctx.beginPath();
        ctx.lineWidth = '6';
        ctx.strokeStyle = '#fff';
        ctx.fillStyle = '#7EAA6F';
        ctx.fillRect(chartArea.left, chartArea.top, width, height * 0.6);
        ctx.fillStyle = '#B9A783';
        ctx.fillRect(chartArea.left, chartArea.top + height * 0.6 , width, height * 0.6);
        ctx.fillStyle = '#769B8A';
        ctx.fillRect(chartArea.left, height * 0.12, width, height * 0.4);
        ctx.fillStyle = '#8D9355';
        ctx.fillRect(((width * 0.5)), chartArea.top, 50, height);
        ctx.stroke();
      }
  };
    const scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
          datasets: [{
              label: 'Scatter Dataset',
              data: [{
                  x: 5,
                  y: 15
              }, {
                  x: 5,
                  y: 10
              }, {
                  x: 7,
                  y: 20
              }]
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
                ticks: {
                  beginAtZero: true,
                  max: 10
               },
               type: 'linear',
               position: 'bottom'
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  max: 22
               }
              }],
          }
      },
      plugins: [plugin]
    });
  }

  /* fillColor() {
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = '6';
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#7EAA6F';
    ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height * 0.3);
    ctx.fillStyle='#B9A783';
    ctx.fillRect(0, this.canvas.nativeElement.height * 0.3 , this.canvas.nativeElement.width, this.canvas.nativeElement.height * 0.3);
    ctx.fillStyle = '#769B8A'
    ctx.fillRect(0, this.canvas.nativeElement.height * 0.6, this.canvas.nativeElement.width, this.canvas.nativeElement.height * 0.4);
    ctx.fillStyle = '#8D9355'
    ctx.fillRect(((this.canvas.nativeElement.width * 0.5) - 15), 0, 30, this.canvas.nativeElement.height);  
    ctx.stroke();
    ctx.font = '.5rem Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Full', 10, 20);
    ctx.font = '.5rem Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Good', 10, 60);
    ctx.font = '.5rem Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Short', 10, 120);
  } */

  onCanvasClick(event) {
    const pos = this.getMousePos(event);
    console.log(pos);
    let context = this.canvas.nativeElement.getContext('2d');
    context.fillStyle = "red";
    context.beginPath();
    context.arc(pos.x, pos.y, 2.5, 0, 2 * Math.PI);
    context.fill();
    this.cd.detectChanges();
    //this.drawCoordinates(pos.x, pos.y);
  }

  getMousePos(evt) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  drawCoordinates(x, y) {

    let ctx = this.canvas.nativeElement.getContext('2d');


    ctx.fillStyle = 'red'; // Red color

    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2, true);
    ctx.fill();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Type of Batsmen',
      buttons: [{
        text: 'Left Hand',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Right Hand',
        handler: () => {
          console.log('Share clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
