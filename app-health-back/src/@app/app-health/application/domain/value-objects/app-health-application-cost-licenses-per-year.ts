import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationCostLicensesPerYear extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationCostLicensesPerYear';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationCostLicensesPerYear',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}