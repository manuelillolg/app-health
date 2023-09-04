import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthCustomerId extends UuidValueObject
{
    public readonly type: string = 'AppHealthCustomerId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthCustomerId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}