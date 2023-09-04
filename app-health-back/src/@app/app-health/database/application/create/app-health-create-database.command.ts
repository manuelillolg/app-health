import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateDatabaseCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            type: string;
            versions: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
