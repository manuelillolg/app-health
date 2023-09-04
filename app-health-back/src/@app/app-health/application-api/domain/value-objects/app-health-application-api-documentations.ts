import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationApiDocumentations extends JsonValueObject
{
    public readonly type: string = 'AppHealthApplicationApiDocumentations';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationApiDocumentations',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}