import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureProviderName extends StringValueObject
{
    public readonly type: string = 'AppHealthInfrastructureProviderName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureProviderName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}