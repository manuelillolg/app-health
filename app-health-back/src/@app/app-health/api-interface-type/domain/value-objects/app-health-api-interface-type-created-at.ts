import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApiInterfaceTypeCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApiInterfaceTypeCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApiInterfaceTypeCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}