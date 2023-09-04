import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateCustomerCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
