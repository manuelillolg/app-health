import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthLanguageDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthLanguageDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthLanguageDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}