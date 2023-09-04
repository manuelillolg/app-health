import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';

export class AppHealthUpdateApplicationLanguageByIdCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId?: string;
            languageId?: string;
            version?: string;
            score?: number;
            codeQualityScore?: number;
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
