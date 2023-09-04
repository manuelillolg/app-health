import { ColumnConfig, ColumnDataType } from '@aurora';

export const customerColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'appHealth.Name',
    },
];