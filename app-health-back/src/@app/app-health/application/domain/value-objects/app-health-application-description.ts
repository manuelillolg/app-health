import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDescription extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationDescription';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDescription',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}