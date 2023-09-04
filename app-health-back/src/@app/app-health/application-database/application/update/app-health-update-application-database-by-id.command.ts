import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationDatabaseByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId?: string;
            databaseId?: string;
            version?: string;
            size?: number;
            score?: number;
            totalCollectionsTables?: number;
            totalFields?: number;
            applicationInfrastructureServiceId?: string;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
