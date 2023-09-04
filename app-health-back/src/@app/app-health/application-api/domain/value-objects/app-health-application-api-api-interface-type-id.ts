import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiApiInterfaceTypeId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApplicationApiApiInterfaceTypeId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiApiInterfaceTypeId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}