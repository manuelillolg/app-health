import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationLanguageId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationLanguageId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationLanguageId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}