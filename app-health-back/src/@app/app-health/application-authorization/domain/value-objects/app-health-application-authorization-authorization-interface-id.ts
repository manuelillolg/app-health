import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationAuthorizationInterfaceId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationAuthorizationInterfaceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationAuthorizationInterfaceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}