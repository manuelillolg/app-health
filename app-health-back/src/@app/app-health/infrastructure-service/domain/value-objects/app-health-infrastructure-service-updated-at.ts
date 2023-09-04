import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureServiceUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthInfrastructureServiceUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureServiceUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}