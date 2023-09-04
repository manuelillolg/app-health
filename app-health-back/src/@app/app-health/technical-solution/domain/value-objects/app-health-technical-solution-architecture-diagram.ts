import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionArchitectureDiagram extends StringValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionArchitectureDiagram';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionArchitectureDiagram',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}