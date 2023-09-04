import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiRequestsPerDay extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationApiRequestsPerDay';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiRequestsPerDay',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}