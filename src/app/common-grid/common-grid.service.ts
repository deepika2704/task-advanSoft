import { Injectable } from '@angular/core';
import { Columns } from './models/Columns';
import { Override } from './models/override';
import { ColumnType } from './models/ColumnType';

@Injectable({
  providedIn: 'root'
})

export class CommonGridService {

  constructor() { }
  ColumnGenerator(overrides: Override[]): Columns[] {
    const col: Columns[] = [];
    overrides.forEach(override => {
      col.push({
        ColName: override.columnName,
        DispName: override.name !== undefined ? override.name : override.columnName,
        ColType: override.colType !== undefined ? override.colType : ColumnType.String
      } as Columns);
    });
    return col;
  }
}
