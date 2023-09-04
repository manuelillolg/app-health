import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationBusinessImpact extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationBusinessImpact';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationBusinessImpact',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}