import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationApplicationId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationApplicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationApplicationId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}