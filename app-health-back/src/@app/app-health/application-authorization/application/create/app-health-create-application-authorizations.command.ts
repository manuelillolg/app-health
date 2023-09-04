import { CQMetadata } from '@aurorajs.dev/core';

export class  AppHealthCreateApplicationAuthorizationsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId: string;
            authorizationInterfaceId: string;
            totalUsers?: number;
            score: number;
            applicationInfrastructureServiceId: string;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
