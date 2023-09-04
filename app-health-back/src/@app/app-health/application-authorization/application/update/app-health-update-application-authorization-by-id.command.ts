import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationAuthorizationByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId?: string;
            authorizationInterfaceId?: string;
            totalUsers?: number;
            score?: number;
            applicationInfrastructureServiceId?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
