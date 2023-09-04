import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationTargetApplicationId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationTargetApplicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationTargetApplicationId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}