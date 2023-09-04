import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationViewId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationViewId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationViewId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}