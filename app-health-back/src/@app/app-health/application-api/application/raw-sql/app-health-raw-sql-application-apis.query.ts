import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApplicationApisQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
