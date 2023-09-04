import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationAuthorizationTotalUsers extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationAuthorizationTotalUsers';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationAuthorizationTotalUsers',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}