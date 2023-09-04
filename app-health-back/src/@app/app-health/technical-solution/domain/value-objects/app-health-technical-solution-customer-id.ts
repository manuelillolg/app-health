import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionCustomerId extends UuidValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionCustomerId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionCustomerId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}