import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateInfrastructureServiceByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            providerId?: string;
            name?: string;
            score?: number;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
