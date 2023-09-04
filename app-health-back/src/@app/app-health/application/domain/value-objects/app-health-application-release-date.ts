import { DataValueObject, DateValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationReleaseDate extends DateValueObject
{
    public readonly type: string = 'AppHealthApplicationReleaseDate';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationReleaseDate',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}