import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationLanguageScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthApplicationLanguageScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationLanguageScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}