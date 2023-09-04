export class AppHealthCreatedApplicationDatabaseEvent
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly databaseId: string,
        public readonly version: string,
        public readonly size: number,
        public readonly score: number,
        public readonly totalCollectionsTables: number,
        public readonly totalFields: number,
        public readonly applicationInfrastructureServiceId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
