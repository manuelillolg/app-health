import { CQMetadata } from '@aurorajs.dev/core';

export class  AppHealthCreateApplicationIntegrationsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            description?: string;
            sourceApplicationId: string;
            targetApplicationId?: string;
            apiInterfaceTypeId: string;
            interfaceNumbers?: number;
            modality: string;
            score: number;
            documentations?: any;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
