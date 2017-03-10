import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { OrdersModule } from './orders/orders.module';
import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    OrdersModule,
    AppRoutingModule
  ],

  declarations: [ 
    AppComponent,
    DashboardComponent,
    InventoryComponent
  ],

  bootstrap:    [ AppComponent ]
})

export class AppModule { }
