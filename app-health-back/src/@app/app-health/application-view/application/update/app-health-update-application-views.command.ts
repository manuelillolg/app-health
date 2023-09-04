import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationViewsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            applicationId?: string;
            totalViews?: number;
            complexity?: string;
            description?: number;
            score?: number;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
