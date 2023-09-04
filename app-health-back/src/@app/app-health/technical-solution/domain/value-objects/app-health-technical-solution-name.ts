import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionName extends StringValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}