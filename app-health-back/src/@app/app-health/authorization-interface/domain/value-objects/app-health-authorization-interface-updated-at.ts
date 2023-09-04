import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthorizationInterfaceUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthAuthorizationInterfaceUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthorizationInterfaceUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}