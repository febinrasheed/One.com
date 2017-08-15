import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PathObject } from '../_models/pathObject';

@Injectable()
export class TreeLookupCode {

    // Observable string sources
    private pathFoundSource = new Subject<PathObject>();
    // Observable string streams
    pathFound$ = this.pathFoundSource.asObservable();

    treeLookup: any;
    queue = [];
    rootPath = '/';
    pathFound = 'NOT_FOUND';
    pathNotFound = 'NOT_FOUND';
    requiredNum: string;

    constructor() {
        this.treeLookup = new window['TreeLookup']();
    }

    searchForElement(requiredNum: string): void {
        this.requiredNum = requiredNum;
        this.queue = [];
        this.treeLookupApi(this.rootPath);
    }
    bfsSearch(): void {
        if (this.queue.length) {
            let currentNum = this.dequeue();
            if (this.requiredNum === currentNum.value) {
                this.pathFound = currentNum.path;
                // Emit path here
                this.pathFoundSource.next(this.setPathObject(this.pathFound, true));
            } else {
                let tempPath = currentNum.path === this.rootPath ? this.rootPath + currentNum.value : currentNum.path + '/' + currentNum.value;
                this.treeLookupApi(tempPath);
            }
        } else {
            // Emit Not found path here
            this.pathFoundSource.next(this.setPathObject(this.pathNotFound, false));
        }
    }

    treeLookupApi(path) {
        this.treeLookup.getChildrenAsCallback(path, (err, nodesFromCb) => {
            if (nodesFromCb.length) {
                this.enqueue(path, nodesFromCb);
            }
            this.bfsSearch();
        });
    }

    enqueue(path, list: Array<number>): void {
        for (let i = 0; i < list.length; i++) {
            let el = {
                path: path,
                value: list[i]
            }
            this.queue.push(el);
        }
    }

    dequeue(): any {
        return this.queue.shift();
    }

    setPathObject(path, isPathFound): PathObject {
        let pathObject = new PathObject();
        pathObject.isPathFound = isPathFound;
        pathObject.path = path;
        return pathObject;
    }
}