import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { OrdersComponent } from './orders.component';
import { InventoryComponent } from './inventory.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'inventory',
        component: InventoryComponent
      }
    ]) ],

  declarations: [ 
    AppComponent,
    DashboardComponent,
    OrdersComponent,
    InventoryComponent
  ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
