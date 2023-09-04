import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthPaginateApplicationAuthorizationsQuery
{
    constructor(
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
