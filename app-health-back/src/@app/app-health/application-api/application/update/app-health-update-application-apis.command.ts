import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationApisCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            applicationId?: string;
            apiInterfaceTypeId?: string;
            score?: number;
            documentations?: any;
            requestsPerDay?: number;
            applicationInfrastructureServiceId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
