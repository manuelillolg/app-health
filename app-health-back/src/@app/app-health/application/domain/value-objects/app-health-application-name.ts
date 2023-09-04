import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationName extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}