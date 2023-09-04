import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateAuthorizationInterfaceByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name?: string;
            score?: number;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
