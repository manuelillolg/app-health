import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateTechnicalSolutionsCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            customerId?: string;
            name?: string;
            description?: string;
            architectureDiagram?: string;
            proposal?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
