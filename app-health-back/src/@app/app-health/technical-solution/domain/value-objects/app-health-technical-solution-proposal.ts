import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionProposal extends StringValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionProposal';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionProposal',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}