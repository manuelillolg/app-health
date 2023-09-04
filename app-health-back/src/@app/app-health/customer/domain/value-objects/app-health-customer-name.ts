import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthCustomerName extends StringValueObject
{
    public readonly type: string = 'AppHealthCustomerName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthCustomerName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}