import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationApiDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}