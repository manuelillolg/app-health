import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}