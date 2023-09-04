import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthenticationInterfaceCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthAuthenticationInterfaceCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthenticationInterfaceCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}