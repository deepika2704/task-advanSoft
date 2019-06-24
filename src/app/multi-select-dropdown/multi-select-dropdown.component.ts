import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(document:click)': 'closeDropDown($event)',
  }
})
export class MultiSelectDropdownComponent implements OnInit, OnChanges {

  @Input() Options: any[];
  @Output() selectedOptions = new EventEmitter<any[]>();
  showDropdown: boolean;
  dropDownData: any[];
  placeholderText: string;
  selectAll = false;
  list: number[];
  filterData: any[];

  @Input()
  get selectedList() {
    return this.list;
  }

  set selectedList(val) {
    this.list = val;
  }

  get allSelected() {
    if (this.selectedList && this.selectedList.length > 0) {
      return this.dropDownData.length === this.selectedList.length;
    }
    return false;
  }

  constructor(private eref: ElementRef) { }

  ngOnInit() {
    this.dropDownData = [];
    this.Options.forEach((option, i) => {
      this.dropDownData.push({ value: option, index: i });
    });
    this.filterData = this.dropDownData;
    this.placeholderText = 'Select';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.selectedList) {
      this.selectedList = [];
    }
  }
  selectOption(pos) {
    if (this.isChecked(pos)) {
      this.selectedList.splice(this.selectedList.indexOf(pos), 1);
    } else {
      this.selectedList.push(pos);
    }
    this.placeholderText = this.selectedList.length + ' Selected';
    this.selectedList = this.selectedList;
    this.selectedOptions.emit(this.selectedList);
  }

  search(text) {
    const searchResult = [];
    const filterDropdown = [...this.dropDownData];
    if (text.target.value !== '') {
      filterDropdown.forEach(element => {
        if (element.value.toString().toLowerCase().includes(text.target.value.toString().toLowerCase())) {
          searchResult.push(element);
        }
      });
      this.dropDownData = searchResult;
    } else {
      this.dropDownData = this.filterData;
    }
  }

  closeDropDown(event) {
    if (!this.eref.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  isChecked(pos) {
    return this.selectedList.indexOf(pos) > -1;
  }

  selectAllToggle() {
    this.selectAll = this.allSelected;
    this.selectAll = !this.selectAll;
    if (!this.selectAll) {
      this.selectedList = [];
      this.placeholderText = '0 Selected';
    } else {
      this.selectedList = Array.from(Array(this.dropDownData.length).keys());
      this.placeholderText = this.selectedList.length + ' Selected';
    }
    this.selectedOptions.emit(this.selectedList);
  }

}
