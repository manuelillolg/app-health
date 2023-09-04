import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertApplicationViewCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId?: string;
            totalViews?: number;
            complexity?: string;
            description?: number;
            score?: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
