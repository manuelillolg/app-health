import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationApiUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}