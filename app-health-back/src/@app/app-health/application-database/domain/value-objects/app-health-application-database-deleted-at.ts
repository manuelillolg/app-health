import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}