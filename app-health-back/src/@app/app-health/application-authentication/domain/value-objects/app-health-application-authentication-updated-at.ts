import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}