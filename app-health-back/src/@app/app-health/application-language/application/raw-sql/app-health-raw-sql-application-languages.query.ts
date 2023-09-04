import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApplicationLanguagesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
