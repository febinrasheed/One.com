import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {  TreeLookupCode } from './_services/treeLookupCode.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot()
  ],
  providers: [
    TreeLookupCode
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
