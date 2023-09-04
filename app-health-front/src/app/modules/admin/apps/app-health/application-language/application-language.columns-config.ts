import { ColumnConfig, ColumnDataType } from '@aurora';

export const applicationLanguageColumnsConfig: ColumnConfig[] = [
    {
        type       : ColumnDataType.STRING,
        field      : 'applicationId',
        sort       : 'applicationId',
        translation: 'appHealth.ApplicationId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'languageId',
        sort       : 'languageId',
        translation: 'appHealth.LanguageId',
    },
    {
        type       : ColumnDataType.STRING,
        field      : 'version',
        sort       : 'version',
        translation: 'appHealth.Version',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'score',
        sort       : 'score',
        translation: 'appHealth.Score',
    },
    {
        type       : ColumnDataType.NUMBER,
        field      : 'codeQualityScore',
        sort       : 'codeQualityScore',
        translation: 'appHealth.CodeQualityScore',
    },
];