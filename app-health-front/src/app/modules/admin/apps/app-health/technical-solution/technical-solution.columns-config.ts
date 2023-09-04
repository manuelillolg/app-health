import { ColumnConfig, ColumnDataType } from '@aurora';

export const technicalSolutionColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'customerId',
        sort       : 'customerId',
        translation: 'appHealth.CustomerId',
    },
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
        field      : 'architectureDiagram',
        sort       : 'architectureDiagram',
        translation: 'appHealth.ArchitectureDiagram',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'proposal',
        sort       : 'proposal',
        translation: 'appHealth.Proposal',
    },
];