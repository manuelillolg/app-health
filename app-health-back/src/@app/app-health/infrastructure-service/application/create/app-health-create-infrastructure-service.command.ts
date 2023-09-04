import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateInfrastructureServiceCommand
{
    constructor(
        public readonly payload: {
            id: string;
            providerId: string;
            name: string;
            score: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
