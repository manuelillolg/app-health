import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertTechnicalSolutionCommand
{
    constructor(
        public readonly payload: {
            id: string;
            customerId?: string;
            name?: string;
            description?: string;
            architectureDiagram?: string;
            proposal?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
