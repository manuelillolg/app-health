import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationLanguagesCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            applicationId?: string;
            languageId?: string;
            version?: string;
            score?: number;
            codeQualityScore?: number;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
