import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLLanguagesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
