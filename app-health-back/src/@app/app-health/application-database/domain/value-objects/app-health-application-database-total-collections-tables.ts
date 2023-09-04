import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseTotalCollectionsTables extends IntValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseTotalCollectionsTables';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseTotalCollectionsTables',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}