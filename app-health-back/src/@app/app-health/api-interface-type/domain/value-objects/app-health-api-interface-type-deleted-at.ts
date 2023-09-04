import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApiInterfaceTypeDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApiInterfaceTypeDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApiInterfaceTypeDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}