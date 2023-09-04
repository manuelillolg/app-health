import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationAuthenticationInterfaceId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationAuthenticationInterfaceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationAuthenticationInterfaceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}