import { ColumnConfig, ColumnDataType } from '@aurora';

export const databaseColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'appHealth.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'type',
        sort       : 'type',
        translation: 'appHealth.Type',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'versions',
        sort       : 'versions',
        translation: 'appHealth.Versions',
    },
];