import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLDatabasesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
