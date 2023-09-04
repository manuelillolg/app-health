import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}