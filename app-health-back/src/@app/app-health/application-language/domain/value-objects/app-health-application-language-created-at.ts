import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationLanguageCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationLanguageCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationLanguageCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}