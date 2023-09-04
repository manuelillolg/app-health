import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLCustomersQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
