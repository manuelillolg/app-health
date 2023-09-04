import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApiInterfaceTypeScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthApiInterfaceTypeScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApiInterfaceTypeScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}