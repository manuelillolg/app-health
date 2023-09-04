import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthCreateLanguageCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            versions: any;
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
