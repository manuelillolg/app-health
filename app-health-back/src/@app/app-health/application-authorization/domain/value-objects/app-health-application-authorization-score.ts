import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationScore extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}