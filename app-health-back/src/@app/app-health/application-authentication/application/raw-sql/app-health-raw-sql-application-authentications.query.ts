import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApplicationAuthenticationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
