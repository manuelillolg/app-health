import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationViewComplexity extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationViewComplexity';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationViewComplexity',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}