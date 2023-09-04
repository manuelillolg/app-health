export class AppHealthUpdatedApplicationAuthorizationEvent
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly authorizationInterfaceId: string,
        public readonly totalUsers: number,
        public readonly score: number,
        public readonly applicationInfrastructureServiceId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}
