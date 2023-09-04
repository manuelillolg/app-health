import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}