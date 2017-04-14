import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Node,Leaf } from './tree'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TreeService {
    constructor(private http: Http) {}
    
    private treeUrl = 'app/MaterialTree';  // URL to web api
    private nodeUrl = 'app/node';  // URL to web api
    private leafUrl = 'app/leaf';  // URL to web api    

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

   getRootTree(): Observable<Node> {
        return this.http.get(this.treeUrl)
            .map(res=>{return res.json()})
            .catch(this.handleError);
    }

    getNodeById(id: number): Observable<Node> {
        const url = `${this.nodeUrl}/${id}`;
        return this.http.get(url)
            .map(res=>{return res.json()})
            .catch(this.handleError);
    }

    getLeafById(id: number): Observable<Leaf> {
        const url = `${this.leafUrl}/${id}`;
        return this.http.get(url)
            .map(res=>{return res.json()})
            .catch(this.handleError);
    }    
}

