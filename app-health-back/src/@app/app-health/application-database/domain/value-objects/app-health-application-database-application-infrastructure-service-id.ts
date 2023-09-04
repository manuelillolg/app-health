import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseApplicationInfrastructureServiceId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseApplicationInfrastructureServiceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseApplicationInfrastructureServiceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}