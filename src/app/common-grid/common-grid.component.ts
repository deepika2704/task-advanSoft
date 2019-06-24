import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnType } from './models/ColumnType';
import { Columns } from './models/Columns';
import { AppService } from '../app.service';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.css']
})
export class CommonGridComponent implements OnInit, OnChanges {

  @Input() Columns: Columns[];
  @Input() InputData: any[];
  @Input() canEdit: boolean;
  @Output() newRow = new EventEmitter();
  @Output() delete = new EventEmitter();
  IterationRange: number[] = [];
  data: any[];
  asc: boolean;
  colType = ColumnType;
  editGrid: boolean;
  editPos: number;
  editedRow: any;
  shallowCopy: any[];

  @Output() EditEvent = new EventEmitter<number>();

  constructor(private service: AppService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.InputData && changes.InputData.currentValue !== changes.InputData.previousValue) {
      this.data = JSON.parse(JSON.stringify(changes.InputData.currentValue));
      this.shallowCopy = this.data;
      if (this.data.length > 10) {
        this.IterationRange.length = 10;
      } else {
        this.IterationRange.length = this.data.length;
      }
    } else {
      this.data = this.InputData !== undefined ? this.InputData.slice() : [];
    }
  }
  Range(number) {
    if (number > this.data.length) {
      this.IterationRange.length = this.data.length;
    } else {
      this.IterationRange.length = number;
    }
  }

  isEditable(i) {
    return this.canEdit && this.editPos === i;
  }

  edit(i) {
    console.log(this.InputData);
    this.editPos = i;
    this.isEditable(i);
  }

  cancel() {
    this.editPos = -1;
    this.isEditable(-1);
   // this.shallowCopy = Array.from(this.data);
  }

  save(i) {
    if (confirm('Do you want to save the changes ?')) {
      this.EditEvent.emit(this.data[i]);
      console.log(this.data[i]);
    } else{
      this.shallowCopy = this.data;
    }
    this.editPos = -1;
    this.isEditable(-1);
  }

  sort(colName: string) {
    let index = 0;
    if (colName) {
      index = this.Columns.findIndex(col => col.ColName === colName);
    }
    this.asc = !this.asc;
    this.data.sort((a, b) => {
      if (a[this.Columns[index].ColName] !== null && b[this.Columns[index].ColName] !== null) {
        switch (this.Columns[index].ColType) {
          case ColumnType.Number:
            return this.service.sortNumber(a[this.Columns[index].ColName], b[this.Columns[index].ColName], this.asc);
          case ColumnType.String:
            return this.service.sortString(a[this.Columns[index].ColName], b[this.Columns[index].ColName], this.asc);
          case ColumnType.Boolean:
            return this.service.sortBoolean(a[this.Columns[index].ColName], b[this.Columns[index].ColName], this.asc);
        }

      }
      return null;
    });
  }
  
  search(val: string) {
    this.data = this.InputData;
    const obj = [];
    this.data.forEach((a) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.Columns.length; i++) {
        if (typeof (a[this.Columns[i].ColName]) === 'string') {
          if (a[this.Columns[i].ColName].toLowerCase().includes(val)) {
            obj.push(a);
            break;
          }
        } else {
          if (a[this.Columns[i].ColName].toString().includes(val)) {
            obj.push(a);
            break;
          }
        }
      }
    });
    this.data = obj;
    //    this.fixIterationRange();
  }
  
  fixIterationRange() {
    if (this.IterationRange.length > 10) {
      this.IterationRange.length = 10;
    } else {
      this.IterationRange.length = this.data.length;
    }
  }

  AddRow() {
    this.newRow.emit();
  }

  deleteRow(index) {
    this.delete.emit(index);
}

}
