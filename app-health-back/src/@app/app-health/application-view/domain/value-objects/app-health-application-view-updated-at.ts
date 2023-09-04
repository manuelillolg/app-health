import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationViewUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationViewUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationViewUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}