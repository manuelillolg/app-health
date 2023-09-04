import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthDatabaseName extends StringValueObject
{
    public readonly type: string = 'AppHealthDatabaseName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthDatabaseName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}