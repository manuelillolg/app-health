import { ColumnConfig, ColumnDataType } from '@aurora';

export const infrastructureServiceColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'providerId',
        sort       : 'providerId',
        translation: 'appHealth.ProviderId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'appHealth.Name',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'score',
        sort       : 'score',
        translation: 'appHealth.Score',
    },
];