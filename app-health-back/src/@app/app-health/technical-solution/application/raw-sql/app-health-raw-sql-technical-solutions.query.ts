import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLTechnicalSolutionsQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
