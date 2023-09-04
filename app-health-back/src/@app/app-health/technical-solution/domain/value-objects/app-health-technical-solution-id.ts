import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionId extends UuidValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}