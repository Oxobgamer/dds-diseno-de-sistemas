import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

/** @title Basic datepicker */
@Component({
  selector: 'datePicker',
  templateUrl: 'datePicker.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    FormsModule],
})
export class DatePicker implements OnInit{
  public value = new Date();
  @Input() startingDateIn = new Date();
  @Output() startingDateOut = new EventEmitter<Date>();
  constructor() {
    this.value = new Date();
  }
  ngOnInit(): void {
    this.value = this.startingDateIn;
  }
  cambio(): void {
    this.startingDateOut.emit(this.value)
  }
}

