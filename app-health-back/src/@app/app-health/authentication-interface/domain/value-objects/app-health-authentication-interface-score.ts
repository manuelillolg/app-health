import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthenticationInterfaceScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthAuthenticationInterfaceScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthenticationInterfaceScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}