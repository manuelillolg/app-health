import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}