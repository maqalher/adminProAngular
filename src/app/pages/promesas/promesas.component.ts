import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // this.getUsuarios().then( usuarios = > {
    //   console.log(usuario)
    // })

    this.getUsuarios();

    // const promesa = new Promise( (resolve,reject) => {

    //   if(false){
    //     resolve('ejecuta resolve');
    //   }else {
    //     reject('ejecuta reject')
    //   }

    // });

    // promesa.then( (mensaje) => {
    //   console.log(mensaje)
    // })
    // .catch( error => console.log('Error en mi promesa', error) )

    // console.log('Fin del Init');

  }

  getUsuarios():any {
    fetch('https://reqres.in/api/users')
      // .then( resp => {
      //   // console.log(resp);
      //   // resp.json().then(body => console.log(body));
      // })
      .then( resp => resp.json() )
      .then( body => console.log(body.data) )

    // const promesa = new Promise( resolve => {
    //   fetch('https://reqres.in/api/users')
    //     .then(resp => resp.json())
    //     .then(body => resolve(body.data));
    // });

    // return promesa;

  }

}
