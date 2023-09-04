import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}