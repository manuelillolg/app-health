import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiApplicationInfrastructureServiceId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationApiApplicationInfrastructureServiceId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiApplicationInfrastructureServiceId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}