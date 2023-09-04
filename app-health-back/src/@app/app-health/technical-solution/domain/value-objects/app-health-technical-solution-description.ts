import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionDescription extends StringValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionDescription';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionDescription',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}