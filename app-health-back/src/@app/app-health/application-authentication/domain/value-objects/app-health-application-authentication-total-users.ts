import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthenticationTotalUsers extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthenticationTotalUsers';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthenticationTotalUsers',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}