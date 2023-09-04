import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationScore extends SmallintValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationScore';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationScore',
            nullable   : false,
            undefinable: false,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}