import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationLanguageLanguageId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationLanguageLanguageId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationLanguageLanguageId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}