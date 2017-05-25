import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { AuthService } from './auth.service';

@Component({
    selector: 'login-form',
    moduleId: module.id,
    styleUrls: ['static/erp/src/app/core/admin/style/login.css'],
    templateUrl: 'static/erp/src/app/core/admin/template/login.component.html'
})

export class LoginComponent implements OnInit {
    
    model: User;
    error: boolean;

    constructor(private authService: AuthService, private router: Router) {
        this.model = new User("请输入用户名", "请输入密码");
        this.error = false;
    }

    ngOnInit() {
        this.authService.logout();
    }

    onSubmit() {
        console.log("Login subimtted.");
        this.authService.login(this.model.name, this.model.password).then(() => {
            
            console.log("Login OK!");
            this.error = false;
            
            let redirect = this.authService.redirectUrl;
            this.router.navigate([redirect]);
        }, err => {
            console.log("Login NOK!");
            this.error = true;
        })

    }
}