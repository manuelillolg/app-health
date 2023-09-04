import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthDatabaseVersions extends JsonValueObject
{
    public readonly type: string = 'AppHealthDatabaseVersions';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthDatabaseVersions',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}