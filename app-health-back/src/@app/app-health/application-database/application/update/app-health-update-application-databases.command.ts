import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationDatabasesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            applicationId?: string;
            databaseId?: string;
            version?: string;
            size?: number;
            score?: number;
            totalCollectionsTables?: number;
            totalFields?: number;
            applicationInfrastructureServiceId?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
