import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApplicationDatabasesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
