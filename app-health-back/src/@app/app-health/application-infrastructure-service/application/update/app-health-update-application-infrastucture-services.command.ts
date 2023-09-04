import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationInfrastuctureServicesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            applicationId?: string;
            infrastructureServiceId?: string;
            averageCostPerYear?: number;
            score?: number;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
