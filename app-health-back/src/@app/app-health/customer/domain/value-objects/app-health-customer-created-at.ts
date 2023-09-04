import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthCustomerCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthCustomerCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthCustomerCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}