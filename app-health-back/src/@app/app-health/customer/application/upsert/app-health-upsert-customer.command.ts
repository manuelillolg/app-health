import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertCustomerCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
