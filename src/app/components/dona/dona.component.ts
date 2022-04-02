import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() titulo:string = 'Sin titulo';
  @Input() labels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data:number[]=[350, 450, 100];

  constructor() { }

  ngOnInit(): void {
  }

  // Doughnut
  // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public doughnutChartData: ChartData<'doughnut'> = {
    // labels: this.doughnutChartLabels,
    labels: this.labels,
    datasets: [
      {
        // data: [350, 450, 100],
        data: this.data,
        backgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003']
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges(){
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [{
        data: this.data,
        backgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003']
      }],
    };
  }


}
