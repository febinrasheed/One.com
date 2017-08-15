import { Component } from '@angular/core';
import { TreeLookupCode } from './_services/treeLookupCode.service';

import { PathObject } from './_models/pathObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchResult = '';
  isPathFound = true;
  showPath = false;

  constructor(public treeLookupCode: TreeLookupCode) {
    /* Write the result back to the screen*/
    treeLookupCode.pathFound$.subscribe(
      path => {
        let pathObject: PathObject = path;
        this.searchResult = pathObject.path;
        this.isPathFound = pathObject.isPathFound;
        this.showPath = true;
      }
    );
  }

  /* Trigger search from UI */
  searchForElement(val: string): void {
    this.showPath = false;
    this.treeLookupCode.searchForElement(val);
  }
}
