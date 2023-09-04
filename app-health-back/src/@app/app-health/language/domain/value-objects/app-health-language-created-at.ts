import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthLanguageCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthLanguageCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthLanguageCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}