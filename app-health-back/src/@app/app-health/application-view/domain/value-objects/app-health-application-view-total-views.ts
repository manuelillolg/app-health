import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationViewTotalViews extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationViewTotalViews';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationViewTotalViews',
            nullable   : false,
            undefinable: false,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}