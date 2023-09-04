import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertApplicationAuthorizationCommand
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
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
