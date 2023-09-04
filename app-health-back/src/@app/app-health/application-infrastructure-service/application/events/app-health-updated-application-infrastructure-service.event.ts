export class AppHealthUpdatedApplicationInfrastructureServiceEvent
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly infrastructureServiceId: string,
        public readonly averageCostPerYear: number,
        public readonly score: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
