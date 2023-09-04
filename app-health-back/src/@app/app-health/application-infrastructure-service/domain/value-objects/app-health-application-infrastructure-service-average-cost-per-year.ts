import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationInfrastructureServiceAverageCostPerYear extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationInfrastructureServiceAverageCostPerYear';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationInfrastructureServiceAverageCostPerYear',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}