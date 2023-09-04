import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}