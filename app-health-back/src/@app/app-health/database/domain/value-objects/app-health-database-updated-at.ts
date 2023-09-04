import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthDatabaseUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthDatabaseUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthDatabaseUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}