import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationInterfaceNumbers extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationInterfaceNumbers';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationInterfaceNumbers',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}