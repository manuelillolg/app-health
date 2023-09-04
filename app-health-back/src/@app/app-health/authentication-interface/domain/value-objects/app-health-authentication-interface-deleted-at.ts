import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthenticationInterfaceDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthAuthenticationInterfaceDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthenticationInterfaceDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}