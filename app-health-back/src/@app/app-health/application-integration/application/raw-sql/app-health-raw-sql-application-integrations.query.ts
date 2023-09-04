import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApplicationIntegrationsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
