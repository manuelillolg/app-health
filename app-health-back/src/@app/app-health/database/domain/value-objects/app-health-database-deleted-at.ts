import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthDatabaseDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthDatabaseDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthDatabaseDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}