import { ColumnType } from './ColumnType';

export interface Override {
    columnName: string;
    name?: string;
    colType?: ColumnType;
}