import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateLanguageByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            versions?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
