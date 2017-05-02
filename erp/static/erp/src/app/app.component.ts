import { Component, OnInit } from '@angular/core';
import { TreeService } from "./shared/tree/tree.service";

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: "./app.component.html" 
})

export class AppComponent implements OnInit  {

  constructor(private ts: TreeService) {
    this.dataReady = false;
    this.counter = 10;
    ts.init();
  }

  ngOnInit() {

    let that = this;

      if (!this.dataReady){
        console.log("Set Timer!");
        setTimeout(function() {
          console.log("Time Out!");
          console.log(that);
          that.dataReady = that.ts.readyForServe();}, 1000);
      }

  }

  // private checkDataReady(ts: TreeService) : Boolean {
  //   console.log("Time Out!");
  //   console.log(this);
  //   return this.dataReady = that.ts.readyForServe();
  // }

  private dataReady: Boolean;
  private counter: number;
}
