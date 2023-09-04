import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationViewColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationId',
        sort       : 'applicationId',
        translation: 'appHealth.ApplicationId',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'totalViews',
        sort       : 'totalViews',
        translation: 'appHealth.TotalViews',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'complexity',
        sort       : 'complexity',
        translation: 'appHealth.Complexity',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'description',
        sort       : 'description',
        translation: 'appHealth.Description',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'score',
        sort       : 'score',
        translation: 'appHealth.Score',
    },
];