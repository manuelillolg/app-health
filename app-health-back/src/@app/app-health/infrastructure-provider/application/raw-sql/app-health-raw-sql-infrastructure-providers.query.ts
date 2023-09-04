import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLInfrastructureProvidersQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
