import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationDatabaseColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationId',
        sort       : 'applicationId',
        translation: 'appHealth.ApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'databaseId',
        sort       : 'databaseId',
        translation: 'appHealth.DatabaseId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'version',
        sort       : 'version',
        translation: 'appHealth.Version',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'size',
        sort       : 'size',
        translation: 'appHealth.Size',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'score',
        sort       : 'score',
        translation: 'appHealth.Score',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'totalCollectionsTables',
        sort       : 'totalCollectionsTables',
        translation: 'appHealth.TotalCollectionsTables',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'totalFields',
        sort       : 'totalFields',
        translation: 'appHealth.TotalFields',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationInfrastructureServiceId',
        sort       : 'applicationInfrastructureServiceId',
        translation: 'appHealth.ApplicationInfrastructureServiceId',
    },
];