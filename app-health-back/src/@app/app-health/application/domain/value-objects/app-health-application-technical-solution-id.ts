import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationTechnicalSolutionId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationTechnicalSolutionId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationTechnicalSolutionId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}