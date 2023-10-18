import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoDetailsComponent } from './components/curso-details/curso-details.component';
import { MatCardModule } from '@angular/material/card';
import { DatePicker } from './components/datePicker/datePicker.component';
import {DateAdapter} from '@angular/material';
import {NativeDateAdapter} from '@angular/material'
import {formatDate} from '@angular/common';
import { MatDialogModule } from '@angular/material';

class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    return formatDate(date, 'dd-MM-YYYY', this.locale);
  }
  override parse(value: any): Date | null {
      return new Date(value.split('-')[1]+'/'+value.split('-')[0]+'/'+value.split('-')[2])
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CursoAddComponent,
    CursoListComponent,
    CursoDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    DatePicker,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter}
  ]
})
export class AppModule { }

