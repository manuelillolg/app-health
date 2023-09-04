import { CQMetadata } from '@aurorajs.dev/core';

export class  AppHealthCreateApplicationLanguagesCommand
{
    constructor(
        public readonly payload: {
            id: string;
            applicationId: string;
            languageId: string;
            version: string;
            score: number;
            codeQualityScore: number;
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}
