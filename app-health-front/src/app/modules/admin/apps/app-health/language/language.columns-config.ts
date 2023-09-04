import { ColumnConfig, ColumnDataType } from '@aurora';

export const languageColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'appHealth.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'versions',
        sort       : 'versions',
        translation: 'appHealth.Versions',
    },
];