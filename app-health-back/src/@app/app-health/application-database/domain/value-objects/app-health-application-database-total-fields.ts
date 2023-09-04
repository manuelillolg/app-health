import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseTotalFields extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseTotalFields';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseTotalFields',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}