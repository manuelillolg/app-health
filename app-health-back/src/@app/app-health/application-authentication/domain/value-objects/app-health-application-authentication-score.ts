import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationScore extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}