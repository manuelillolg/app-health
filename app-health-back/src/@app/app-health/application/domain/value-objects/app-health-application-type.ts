import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationType extends EnumValueObject
{
    public readonly type: string = 'AppHealthApplicationType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationType',
            nullable   : false,
            undefinable: false,
            enumOptions: ['FRONTEND','SERVER','MOBILE','EMBEDDED'],
        }, validationRules));
    }
}