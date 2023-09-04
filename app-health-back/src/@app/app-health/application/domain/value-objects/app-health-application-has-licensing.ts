import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationHasLicensing extends BooleanValueObject
{
    public readonly type: string = 'AppHealthApplicationHasLicensing';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationHasLicensing',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}