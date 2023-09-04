import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationInfrastructureServiceCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationInfrastructureServiceCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationInfrastructureServiceCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}