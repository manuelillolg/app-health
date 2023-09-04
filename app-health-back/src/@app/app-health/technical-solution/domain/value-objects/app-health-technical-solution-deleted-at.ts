import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthTechnicalSolutionDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthTechnicalSolutionDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthTechnicalSolutionDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}