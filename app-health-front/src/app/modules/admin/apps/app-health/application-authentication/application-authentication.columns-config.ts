import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationAuthenticationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationId',
        sort       : 'applicationId',
        translation: 'appHealth.ApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'authenticationInterfaceId',
        sort       : 'authenticationInterfaceId',
        translation: 'appHealth.AuthenticationInterfaceId',
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