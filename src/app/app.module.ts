import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActionsComponent } from './actions/actions.component';
import { AppRoutingModule } from './app.routing';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';
import { CommonGridComponent } from './common-grid/common-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { HelloGreetsComponent } from './hello-greets/hello-greets.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    MultiSelectDropdownComponent,
    CommonGridComponent,
    HelloGreetsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
