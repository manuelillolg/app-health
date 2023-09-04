import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}