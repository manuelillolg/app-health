import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationInfrastructureServiceDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationInfrastructureServiceDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationInfrastructureServiceDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}