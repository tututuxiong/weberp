import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{brand_name}}</h1>
  <a routerLink="/dashboard">ERP DashBoard</a>
  <router-outlet></router-outlet>
  `,
})

export class AppComponent  { 
  brand_name = 'ERP Online System'; }
