import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TabSwicherComponent } from '../components/TabSwicher/TabSwicher.component';

@NgModule({
  declarations: [
    AppComponent,
    TabSwicherComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
