import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationInfrastructureServiceScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthApplicationInfrastructureServiceScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationInfrastructureServiceScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}