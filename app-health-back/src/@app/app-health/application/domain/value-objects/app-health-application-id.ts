import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}