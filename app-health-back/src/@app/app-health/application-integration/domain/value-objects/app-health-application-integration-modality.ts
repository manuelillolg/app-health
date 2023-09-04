import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationModality extends EnumValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationModality';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationModality',
            nullable   : false,
            undefinable: false,
            enumOptions: ['UNIDIRECTIONAL','BIDIRECTIONAL'],
        }, validationRules));
    }
}