import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AppHealthApplicationIntegrationDocumentations extends JsonValueObject
{
    public readonly type: string = 'AppHealthApplicationIntegrationDocumentations';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AppHealthApplicationIntegrationDocumentations',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}