import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}