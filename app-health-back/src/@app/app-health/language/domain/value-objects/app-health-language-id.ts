import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthLanguageId extends UuidValueObject
{
    public readonly type: string = 'AppHealthLanguageId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthLanguageId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}