import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertInfrastructureServiceCommand
{
    constructor(
        public readonly payload: {
            id: string;
            providerId?: string;
            name?: string;
            score?: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
