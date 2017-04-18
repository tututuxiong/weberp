import { Injectable } from "@angular/core";
import { Headers, Http, Response ,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Node, Leaf } from './tree'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TreeService {

    constructor(private http: Http) {
            
    }

    /* Called when app is loaded to secure material tree is cached before any feature component loaded. */
    init(): void {
        this.getTreeRoot().subscribe(rootNode => {

            this.materialTree = rootNode;
            this.getSubTree(this.materialTree);

            this.initialized = true;

            console.log("Tree initialized!");
        });
    }

    materialTree: Node;
    initialized: Boolean = false;
    
    private treeUrl = 'app/MaterialTree';  // URL to web api
    private nodeUrl = 'app/node';  // URL to web api
    private leafUrl = 'app/leaf';  // URL to web api
  
    private procurementOrder = 'app/procurementOrder';  // URL to web api    
    private materialTreeUrl = 'materialTree';  // URL to web api
    private subProduct = 'app/subPorduct';  // URL to web api    

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

// --- Frank refactor start ---

    getTreeRoot(): Observable<Node> {
        return this.http.get(this.treeUrl)
            .map(res => { return res.json() })
            .catch(this.handleError);
    }

    getNodeLeafs(leafs: Leaf[]) {
        leafs.forEach(leaf => {
            this.getLeafById(leaf.id).subscribe(res => {
                leaf.id = res.id;
                leaf.name = res.name;
                leaf.parentId = res.parentId;
            })
        })
    }

    getSubTree(subTreeRoot: Node) {
        this.getNodeLeafs(subTreeRoot.leafs);
        
        subTreeRoot.subNodes.forEach(node => {
            this.getNodeById(node.id).subscribe(res => {
                node.id = res.id;
                node.name = res.name;
                node.parentId = res.parentId;
                node.subNodes = res.subNodes;
                node.leafs = res.leafs;
                this.getSubTree(node);
            });
        })
    }

    getChildrenNodes(parent: Node): Node[] {

        if (parent == undefined)
            parent = this.materialTree;

        return parent.subNodes;
    }

    getChildrenLeafs(parent: Node): Leaf[] {
        if (parent == undefined)
            parent = this.materialTree;

        return parent.leafs;
    }

    getParentByLeafId(id: number, root: Node): Node {
        console.log(root);
        if (root == undefined){
            root = this.materialTree;
        }
        console.log(root);

        for (var i=0; i<root.leafs.length; i++) {
            if (root.leafs[i].id == id){
                console.log("Parent is found!");
                console.log(root);
                return root;
            }
        }

        for (var j=0; j<root.subNodes.length; j++) {
           let res = this.getParentByLeafId(id, root.subNodes[j]);

           if (res != undefined) return res;
        }

        console.log("Should NOT happen!");
        return undefined;
    }

// --- Frank refactor end ---

    getNodeById(id: number): Observable<Node> {
        const url = `${this.nodeUrl}/${id}`;
        return this.http.get(url)
            .map(res => { return res.json() })
            .catch(this.handleError);
    }
    addNewNode(node: Node): Observable<Node> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.nodeUrl}/${0}`;
        return  this.http.put(url, { node }, options)
                       .map(res => { return res.json() })
                       .catch(this.handleError);        
    }
    
    addNewLeaf(leaf: Leaf): Observable<Leaf> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.leafUrl}/${0}`;
        return  this.http.put(url, { leaf }, options)
                       .map(res => { return res.json() })
                       .catch(this.handleError);        
    }

    getLeafById(id: number): Observable<Leaf> {
        const url = `${this.leafUrl}/${id}`;
        return this.http.get(url)
            .map(res => { return res.json() })
            .catch(this.handleError);
    }
    
    getProcurementOrderMaterialTree(id: number): Observable<Node>{
        const url = `${this.procurementOrder}/${id}/${this.materialTreeUrl}`;
        return this.http.get(url)
            .map(res => { return res.json() })
            .catch(this.handleError);
    }
    getSubProductMaterialTree(id: number): Observable<Node>{
        const url = `${this.subProduct}/${id}/${this.materialTreeUrl}`;
        return this.http.get(url)
            .map(res => { return res.json() })
            .catch(this.handleError);
    }    
}

