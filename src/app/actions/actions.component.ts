import { AppService } from './../app.service';
import { Component, OnInit, Type } from '@angular/core';
import { Override } from '../common-grid/models/override';
import { ColumnType } from '../common-grid/models/ColumnType';
import { Columns } from '../common-grid/models/Columns';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  actionsOptions;
  actions: any = [];
  actionsAttribute: any = [];
  toShowAction: boolean = false;
  toShowActionAttribute: boolean = false;
  selectedActionAttribute;
  options: any[];
  columns: Columns[];
  rows: any;
  selectedAction: string;
  selectedAttributes: any[] = [];
  index: number;
  override: Override[];

  constructor(private appservice: AppService) { }

  ngOnInit() {
    this.actionsOptions = [
      { value: 'One', label: 'One' },
      { value: 'Two', label: 'Two' },
      { value: 'Three', label: 'Three' },
      { value: 'Four', label: 'Four' },
      { value: 'Five', label: 'Five' }
    ]
    this.options = [
      'One',
      'Two',
      'Three',
      'Four'
    ]
    this.appservice.getAttributes().then(resp => {
      this.rows = resp;
    });
    this.columns = this.appservice.generateColumn(this.gridInit());
  }

  gridInit(): Override[] {
    this.override= 
    [
      { columnName: 'Pn', name: 'PN', colType: ColumnType.Number },
      { columnName: 'Description', name: 'Description', colType: ColumnType.String },
      { columnName: 'ItemsClassifications', name: 'Items Classifications', colType: ColumnType.String },
      { columnName: 'Qty', name: 'Qty', colType: ColumnType.Number },
      { columnName: 'UOM', name: 'UOM', colType: ColumnType.Number },
      { columnName: 'Condition', name: 'Condition', colType: ColumnType.String },
      { columnName: 'UnitCost', name: 'Unit Cost', colType: ColumnType.Number },
      { columnName: 'ExtCost', name: 'Extra Cost', colType: ColumnType.Number },
      { columnName: 'Provission', name: 'Provission', colType: ColumnType.String },
      { columnName: 'Deffered', name: 'Deffered', colType: ColumnType.String },
      { columnName: 'FigureId', name: 'Figure Id', colType: ColumnType.Number },
    ];
    return this.override;
  }

  addActions() {
    if (this.selectedAction == undefined) {
      alert("Please Select an Action to Continue");
      return;
    }
    this.actions.push(this.selectedAction);
    this.toShowAction = true;
  }

  addActionsAttributes() {
    this.selectedOptions(this.index);
    if (this.selectedAttributes.length > 0) {
      this.toShowActionAttribute = true;
    }
  }
  selectedOptions(pos) {
    this.index = pos;
    if (pos == undefined) {
      alert('Please Select an Action Attribute to Continue')
      return;
    }
    this.selectedAttributes = []
    pos.forEach(element => {
      this.selectedAttributes.push(this.options[element]);
    });
    console.log(this.selectedAttributes)
  }

  addRow(){
    let newRow = {
      "Pn" : 1,
      "Description" : "This is description",
      "ItemsClassifications": "",
      "Qty": 100,
      "UOM": 200,
      "Condition" : "NA",
      "UnitCost" : 500,
      "ExtCost" : 10,
      "Provission" : "NA",
      "Deffered" : "Yes",
      "FigureId" : 1
  }

  let tabledata = this.rows;
  tabledata.push(newRow);
  this.rows = tabledata;
  console.log(this.rows);
  }

  add(){
    let newRow = {
      "Pn" : "",
      "Description" : "",
      "ItemsClassifications": "",
      "Qty": "",
      "UOM": "",
      "Condition" : "",
      "UnitCost" : "",
      "ExtCost" : "",
      "Provission" : "",
      "Deffered" : "",
      "FigureId" : ""
  }

  let tabledata = this.rows;
  tabledata.push(newRow);
  
  this.rows = tabledata;
  console.log(this.rows);

  this.rows = this.rows.slice();

  }

  delete(i){
    this.rows.splice(1, 1);
    this.rows = this.rows.slice(); 
  }
}
