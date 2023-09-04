export class AppHealthCreatedInfrastructureServiceEvent
{
    constructor(
        public readonly id: string,
        public readonly providerId: string,
        public readonly name: string,
        public readonly score: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
