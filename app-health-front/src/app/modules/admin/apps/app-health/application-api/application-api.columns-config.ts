import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationApiColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationId',
        sort       : 'applicationId',
        translation: 'appHealth.ApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'apiInterfaceTypeId',
        sort       : 'apiInterfaceTypeId',
        translation: 'appHealth.ApiInterfaceTypeId',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'score',
        sort       : 'score',
        translation: 'appHealth.Score',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'documentations',
        sort       : 'documentations',
        translation: 'appHealth.Documentations',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'requestsPerDay',
        sort       : 'requestsPerDay',
        translation: 'appHealth.RequestsPerDay',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationInfrastructureServiceId',
        sort       : 'applicationInfrastructureServiceId',
        translation: 'appHealth.ApplicationInfrastructureServiceId',
    },
];