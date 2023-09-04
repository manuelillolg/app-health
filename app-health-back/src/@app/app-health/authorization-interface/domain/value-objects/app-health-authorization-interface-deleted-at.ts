import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthorizationInterfaceDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthAuthorizationInterfaceDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthorizationInterfaceDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}