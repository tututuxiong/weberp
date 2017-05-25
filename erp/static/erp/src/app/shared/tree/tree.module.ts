import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { TreeComponent} from './tree.component';
import { DropdownTreeComponent} from './dropdown-tree.component';
import { ExpandTreeComponent } from './expandTree.component';
import { TreeService } from './tree.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
    ],

    declarations: [
        TreeComponent,
        DropdownTreeComponent,
        ExpandTreeComponent,
    ],
    providers: [
        TreeService,
    ],

    exports:[
        TreeComponent,
        DropdownTreeComponent,
        ExpandTreeComponent],
})

export class TreeModule {}
