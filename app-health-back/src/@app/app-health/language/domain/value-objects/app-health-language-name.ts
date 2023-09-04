import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthLanguageName extends StringValueObject
{
    public readonly type: string = 'AppHealthLanguageName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthLanguageName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}