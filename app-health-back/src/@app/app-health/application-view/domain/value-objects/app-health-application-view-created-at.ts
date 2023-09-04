import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationViewCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AppHealthApplicationViewCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationViewCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}