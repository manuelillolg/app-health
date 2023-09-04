import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}