import { Injectable } from '@angular/core';
import { CommonGridService } from './common-grid/common-grid.service';
import { Override } from './common-grid/models/override';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = 'assets/tableData.json';

  constructor(private http: HttpClient, private columnService: CommonGridService) { }

  generateColumn(override: Override[]): any[] {
    return this.columnService.ColumnGenerator(override);
  }
  sortString(val1: string, val2: string, asc: boolean) {
    if (val1.toLowerCase() < val2.toLowerCase()) {
      if (asc) {
        return 1;
      }
      return -1;
    } else if (val1.toLowerCase() === val2.toLowerCase()) {
      return 0;
    } else {
      if (asc) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  sortNumber(val1: number, val2: number, asc: boolean) {
    if (asc) {
      return val2 - val1;
    } else {
      return val1 - val2;
    }
  }
  sortBoolean(val1: boolean, val2: boolean, asc: boolean) {
    if (val1 === true) {
      if (asc) {
        return 1;
      }
      return -1;
    } else if (val1 === val2) {
      return 0;
    } else {
      if (asc) {
        return -1;
      }
      return 1;
    }
  }

  getAttributes() {
    return this.http.get(this.url).toPromise();
  }
}
