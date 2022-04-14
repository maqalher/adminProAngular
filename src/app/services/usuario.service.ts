import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!:Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone:NgZone) {

    this.googleInit();

  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '736440233921-kofsmv07uo16mdsm1spu2ccie06raul2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  logout() {
    localStorage.removeItem('token');
    // this.router.navigateByUrl('/login');

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  // regresa un obserbabel boolean
  // se obtine valor de localstorage || ''
  // verifica si esta almacenado en locastorage
  // si es '' marca erro y entra al catchError y manda un obserbalae en false
  // si existe lo renueva y almacena en localstorage
  // si no existe manda false
  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        // 'x-token': token
        'x-token': this.token
      }
    }).pipe(
      // tap((resp: any) => {
      //   // muestra toda la infomacion del usuario
      //   console.log(resp);

      //   const { email, google, nombre, role, img = '', uid } = resp.usuario;

      //     this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

      //   // this.usuario.imprimirUsuario();

      //   localStorage.setItem('token', resp.token);
      // }),
      // map(res => true),
      map((resp: any) => {
        // muestra toda la infomacion del usuario
        console.log(resp);

        const { email, google, nombre, role, img = '', uid } = resp.usuario;

          this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

        // this.usuario.imprimirUsuario();

        localStorage.setItem('token', resp.token);
        return true
      }),
      catchError(error => of(false))
    );

  }

  crearUsuario(formData: RegisterForm) {
    // console.log(formData);

    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp)

          localStorage.setItem('token', resp.token)
        })
      )

  }

  actualizarPerfil(data:{email:string, nombre:string, role:string}){

    data = {
      ...data,
      role: this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }


  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          // muestra toda la infomacion del usuario
          // console.log(resp);

          localStorage.setItem('token', resp.token)
        })
      )
  }

  loginGoogle( token:any ) {

    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

}
