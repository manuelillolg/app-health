import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseDatabaseId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseDatabaseId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseDatabaseId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}