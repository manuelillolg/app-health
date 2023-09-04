import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthenticationInterfaceUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthAuthenticationInterfaceUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthenticationInterfaceUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}