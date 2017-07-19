import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class AuthService {
    private user_name: string;
    private permission_level: number;
    private is_logged_in: boolean;
    private is_data_cached: boolean;

    redirectUrl: string;

    private users: User[];

    constructor(private http: Http) {
        this.user_name = '';
        this.permission_level = undefined;
        this.is_logged_in = false;
        this.is_data_cached = false;
        this.users = [];
        this.redirectUrl = '/dashboard';    // default redirect url
    }

    /* Error Handling */
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    isLoggedIn(): boolean {
        return this.is_logged_in;
    }

    isPermitted(required_permission_level: number): boolean {
        // if (this.permission_level == undefined)
        //     return false;

        // if (this.permission_level <= required_permission_level) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    }

    login(name: string, password: string): Promise<boolean> {

        let that = this;

        console.log(name, password);

        let result: Promise<boolean> = new Promise(function (resolve, reject) {

            if (!that.is_data_cached) {
                that.getUsers().subscribe(data => {

                    data.forEach(user => {
                        let tmp = new User(user.name, user.password, user.type);
                        that.users.push(tmp);
                    });

                    that.is_data_cached = true;

                    if (that.isUserAuthorized(name, password)) {
                        that.user_name = name;
                        resolve(that.is_logged_in = true);
                    } else {
                        reject();
                    }
                });
            } else {
                if (that.isUserAuthorized(name, password)) {
                    that.user_name = name;
                    resolve(that.is_logged_in = true);
                } else {
                    reject();
                }
            }
        });

        return result;
    }

    isUserAuthorized(name: string, password: string): boolean {

        for (let i: number = 0; i < this.users.length; i++) {
            if (this.users[i].name == name && this.users[i].password == password) {
                this.permission_level = this.getPermissionLevel(this.users[i].type);
                return true;
            }
        }

        return false;
    }

    private getPermissionLevel(role: string): number {
        let level: number = undefined;

        switch(role) {
            case "Manager":
                level = 0;
                break;

            case "Staff":
                level = 1;
                break;

            default:
                break;
        }

        return level;
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body.userList;
    }

    private getUsers(): Observable<User[]> {
        let url = 'app/users';

        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    logout(): void {
        this.is_logged_in = false;
        this.user_name = '';
        this.permission_level = undefined;
    }
}