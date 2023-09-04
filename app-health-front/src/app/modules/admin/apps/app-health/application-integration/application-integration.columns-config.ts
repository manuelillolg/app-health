import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationIntegrationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'name',
        sort       : 'name',
        translation: 'appHealth.Name',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'description',
        sort       : 'description',
        translation: 'appHealth.Description',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'sourceApplicationId',
        sort       : 'sourceApplicationId',
        translation: 'appHealth.SourceApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'targetApplicationId',
        sort       : 'targetApplicationId',
        translation: 'appHealth.TargetApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'apiInterfaceTypeId',
        sort       : 'apiInterfaceTypeId',
        translation: 'appHealth.ApiInterfaceTypeId',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'interfaceNumbers',
        sort       : 'interfaceNumbers',
        translation: 'appHealth.InterfaceNumbers',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'modality',
        sort       : 'modality',
        translation: 'appHealth.Modality',
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
];