import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureServiceProviderId extends UuidValueObject
{
    public readonly type: string = 'AppHealthInfrastructureServiceProviderId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureServiceProviderId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}