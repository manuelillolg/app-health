import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthorizationInterfaceScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthAuthorizationInterfaceScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthorizationInterfaceScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}