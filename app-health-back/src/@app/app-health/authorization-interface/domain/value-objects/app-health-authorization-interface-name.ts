import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthAuthorizationInterfaceName extends StringValueObject
{
    public readonly type: string = 'AppHealthAuthorizationInterfaceName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthAuthorizationInterfaceName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}