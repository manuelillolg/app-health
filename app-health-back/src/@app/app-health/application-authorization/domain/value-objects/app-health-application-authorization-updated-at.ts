import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}