import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationIntegrationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            description?: string;
            sourceApplicationId?: string;
            targetApplicationId?: string;
            apiInterfaceTypeId?: string;
            interfaceNumbers?: number;
            modality?: string;
            score?: number;
            documentations?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
