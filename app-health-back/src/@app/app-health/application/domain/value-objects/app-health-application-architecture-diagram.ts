import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationArchitectureDiagram extends StringValueObject
{
    public readonly type: string = 'AppHealthApplicationArchitectureDiagram';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationArchitectureDiagram',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}