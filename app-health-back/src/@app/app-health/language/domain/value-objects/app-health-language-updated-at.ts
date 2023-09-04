import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthLanguageUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthLanguageUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthLanguageUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}