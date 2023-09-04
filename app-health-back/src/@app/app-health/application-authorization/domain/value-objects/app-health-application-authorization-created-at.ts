import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}