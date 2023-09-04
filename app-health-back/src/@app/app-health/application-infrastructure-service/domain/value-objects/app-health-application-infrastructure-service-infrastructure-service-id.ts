import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationInfrastructureServiceInfrastructureServiceId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationInfrastructureServiceInfrastructureServiceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationInfrastructureServiceInfrastructureServiceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}