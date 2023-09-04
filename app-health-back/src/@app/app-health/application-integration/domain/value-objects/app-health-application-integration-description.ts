import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationDescription extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationDescription';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationDescription',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}