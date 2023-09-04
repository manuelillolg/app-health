import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationLanguageUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationLanguageUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationLanguageUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}