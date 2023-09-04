import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}