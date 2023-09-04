export class AppHealthCreatedApplicationApiEvent
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly apiInterfaceTypeId: string,
        public readonly score: number,
        public readonly documentations: any,
        public readonly requestsPerDay: number,
        public readonly applicationInfrastructureServiceId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
