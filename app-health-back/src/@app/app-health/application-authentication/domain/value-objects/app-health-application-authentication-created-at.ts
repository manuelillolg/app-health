import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}