import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthDatabaseId extends UuidValueObject
{
    public readonly type: string = 'AppHealthDatabaseId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthDatabaseId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}