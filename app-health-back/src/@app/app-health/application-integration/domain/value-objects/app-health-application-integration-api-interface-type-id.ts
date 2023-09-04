import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationApiInterfaceTypeId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationApiInterfaceTypeId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationApiInterfaceTypeId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}