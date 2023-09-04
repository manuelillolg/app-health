import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationApiCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}