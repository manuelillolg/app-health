import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureProviderDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthInfrastructureProviderDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureProviderDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}