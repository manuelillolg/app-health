import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}