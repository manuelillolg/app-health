import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLApiInterfaceTypesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
