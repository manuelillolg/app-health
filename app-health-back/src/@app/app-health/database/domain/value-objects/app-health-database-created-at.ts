import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthDatabaseCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthDatabaseCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthDatabaseCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}