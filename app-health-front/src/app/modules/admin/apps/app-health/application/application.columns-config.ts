import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'technicalSolutionId',
        sort       : 'technicalSolutionId',
        translation: 'appHealth.TechnicalSolutionId',
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
        field      : 'businessImpact',
        sort       : 'businessImpact',
        translation: 'appHealth.BusinessImpact',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'type',
        sort       : 'type',
        translation: 'appHealth.Type',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'releaseDate',
        sort       : 'releaseDate',
        translation: 'appHealth.ReleaseDate',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'architectureDiagram',
        sort       : 'architectureDiagram',
        translation: 'appHealth.ArchitectureDiagram',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'hasTenants',
        sort       : 'hasTenants',
        translation: 'appHealth.HasTenants',
    },
    {
        type       : ColumnDataType.BOOLEAN,
        field      : 'hasLicensing',
        sort       : 'hasLicensing',
        translation: 'appHealth.HasLicensing',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'costLicensesPerYear',
        sort       : 'costLicensesPerYear',
        translation: 'appHealth.CostLicensesPerYear',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'requestsPerDay',
        sort       : 'requestsPerDay',
        translation: 'appHealth.RequestsPerDay',
    },
];