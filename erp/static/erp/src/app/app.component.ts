import { Component } from '@angular/core';
import { TreeService } from "./shared/tree/tree.service";

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: "./app.component.html" 
})

export class AppComponent  {

  constructor(private ts: TreeService) {
    ts.init();
  }
}
