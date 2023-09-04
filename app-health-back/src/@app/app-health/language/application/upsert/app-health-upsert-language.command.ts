import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertLanguageCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            versions?: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
