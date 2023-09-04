import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthInfrastructureServiceScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthInfrastructureServiceScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthInfrastructureServiceScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}