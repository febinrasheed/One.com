import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {  TreeLookupCode } from './_services/treeLookupCode.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TreeLookupCode
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
