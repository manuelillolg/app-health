import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationDatabaseVersion extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationDatabaseVersion';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationDatabaseVersion',
            nullable   : false,
            undefinable: false,
            maxLength  : 20,
        }, validationRules));
    }
}