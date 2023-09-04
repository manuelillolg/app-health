import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthCustomerDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthCustomerDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthCustomerDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}