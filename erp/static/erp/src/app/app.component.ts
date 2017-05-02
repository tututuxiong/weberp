import { Component, OnInit } from '@angular/core';
import { TreeService } from "./shared/tree/tree.service";

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: "./app.component.html" 
})

export class AppComponent implements OnInit  {

  constructor(private ts: TreeService) {
    ts.init();
  }

  ngOnInit() {
    console.log("AppComponent is starting...");
  }

}
