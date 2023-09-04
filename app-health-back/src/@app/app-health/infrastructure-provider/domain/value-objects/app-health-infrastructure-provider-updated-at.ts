import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureProviderUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthInfrastructureProviderUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureProviderUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}