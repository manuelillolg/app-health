import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationInfrastructureServiceUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationInfrastructureServiceUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationInfrastructureServiceUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}