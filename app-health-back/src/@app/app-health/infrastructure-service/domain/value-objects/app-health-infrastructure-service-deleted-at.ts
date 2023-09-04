import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureServiceDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthInfrastructureServiceDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureServiceDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}