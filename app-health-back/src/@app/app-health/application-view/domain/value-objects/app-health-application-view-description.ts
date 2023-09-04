import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationViewDescription extends SmallintValueObject
{
    public readonly type: string = 'AppHealthApplicationViewDescription';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationViewDescription',
            nullable   : true,
            undefinable: true,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}