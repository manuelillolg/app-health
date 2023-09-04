import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}