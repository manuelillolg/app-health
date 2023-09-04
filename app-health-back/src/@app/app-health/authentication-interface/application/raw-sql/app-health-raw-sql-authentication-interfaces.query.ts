import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLAuthenticationInterfacesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
