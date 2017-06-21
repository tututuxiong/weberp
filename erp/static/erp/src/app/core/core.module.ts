import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from './admin/login.component';

import { AuthService } from './admin/auth.service';
import { AuthGuard } from './admin/auth-guard.service';
import { AuthGuardSuper } from './admin/auth-guard-super.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
    ],

    declarations: [
        LoginComponent
    ],

    exports: [
        LoginComponent
    ],

    providers: [
        AuthService,
        AuthGuard,
        AuthGuardSuper
    ]
})

export class CoreModule {}