import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApplicationViewsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
