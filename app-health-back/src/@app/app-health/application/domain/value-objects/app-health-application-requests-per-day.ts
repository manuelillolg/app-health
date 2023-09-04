import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationRequestsPerDay extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationRequestsPerDay';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationRequestsPerDay',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}