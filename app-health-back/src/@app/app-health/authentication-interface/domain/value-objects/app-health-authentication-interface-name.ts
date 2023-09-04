import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthenticationInterfaceName extends StringValueObject
{
    public readonly type: string = 'AppHealthAuthenticationInterfaceName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthenticationInterfaceName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}