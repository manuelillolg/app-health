import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationApplicationInfrastructureServiceId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationApplicationInfrastructureServiceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationApplicationInfrastructureServiceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}