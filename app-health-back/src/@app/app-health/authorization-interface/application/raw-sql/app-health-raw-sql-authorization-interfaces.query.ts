import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthRawSQLAuthorizationInterfacesQuery
{
    constructor(
        public readonly rawSQL?: string,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
