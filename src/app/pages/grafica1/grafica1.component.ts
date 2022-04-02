import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  // titulo:string = 'Ventas';
  labels1: string[] = ['Pan', 'Leche', 'Huevos'];
  data1:number[] = [10,15,40];


}
