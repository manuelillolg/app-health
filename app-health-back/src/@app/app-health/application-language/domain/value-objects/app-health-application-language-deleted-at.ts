import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationLanguageDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationLanguageDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationLanguageDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}