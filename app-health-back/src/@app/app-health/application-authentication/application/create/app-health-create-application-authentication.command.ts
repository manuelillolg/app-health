import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateApplicationAuthenticationCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId: string;
            authenticationInterfaceId: string;
            totalUsers?: number;
            score: number;
            applicationInfrastructureServiceId: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
