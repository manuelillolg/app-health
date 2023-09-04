import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationAuthenticationsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            applicationId?: string;
            authenticationInterfaceId?: string;
            totalUsers?: number;
            score?: number;
            applicationInfrastructureServiceId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
