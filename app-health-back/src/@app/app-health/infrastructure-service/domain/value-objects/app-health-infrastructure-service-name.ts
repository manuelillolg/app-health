import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureServiceName extends StringValueObject
{
    public readonly type: string = 'AppHealthInfrastructureServiceName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureServiceName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}