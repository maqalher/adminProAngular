import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTheme = document.querySelector('#theme');

  constructor() {

    // Obtiene la variable de localStorage o pone defalut para asignar tema al cargar pages
    // ./assets/css/colors/default-dark.css
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);

  }

  changeTheme(theme:string){
    // console.log(theme)
    // console.log(linkTheme);
    const url = `./assets/css/colors/${theme}.css`;
    // console.log(url)
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    // console.log(this.links)

    links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }

    });
  }

}
