import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureProviderCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthInfrastructureProviderCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureProviderCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}