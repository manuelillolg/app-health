import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertApplicationInfrastructureServiceCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId?: string;
            infrastructureServiceId?: string;
            averageCostPerYear?: number;
            score?: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
