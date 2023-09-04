export class AppHealthUpdatedApplicationLanguageEvent
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly languageId: string,
        public readonly version: string,
        public readonly score: number,
        public readonly codeQualityScore: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
