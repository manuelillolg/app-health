import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationAuthorizationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationId',
        sort       : 'applicationId',
        translation: 'appHealth.ApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'authorizationInterfaceId',
        sort       : 'authorizationInterfaceId',
        translation: 'appHealth.AuthorizationInterfaceId',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'totalUsers',
        sort       : 'totalUsers',
        translation: 'appHealth.TotalUsers',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'score',
        sort       : 'score',
        translation: 'appHealth.Score',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationInfrastructureServiceId',
        sort       : 'applicationInfrastructureServiceId',
        translation: 'appHealth.ApplicationInfrastructureServiceId',
    },
];