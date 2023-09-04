import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApiInterfaceTypeId extends UuidValueObject
{
    public readonly type: string = 'AppHealthApiInterfaceTypeId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApiInterfaceTypeId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}