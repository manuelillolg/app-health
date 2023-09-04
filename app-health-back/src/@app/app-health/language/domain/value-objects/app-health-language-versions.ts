import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthLanguageVersions extends JsonValueObject
{
    public readonly type: string = 'AppHealthLanguageVersions';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthLanguageVersions',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}