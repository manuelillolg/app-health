import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApiInterfaceTypeUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApiInterfaceTypeUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApiInterfaceTypeUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}