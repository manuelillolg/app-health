import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpsertApiInterfaceTypeCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            score?: number;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
