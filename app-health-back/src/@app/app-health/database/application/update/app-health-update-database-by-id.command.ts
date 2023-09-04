import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateDatabaseByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            type?: string;
            versions?: any;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
