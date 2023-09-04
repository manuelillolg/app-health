import { AppHealthInfrastructureProviderResponse } from '@app/app-health/infrastructure-provider';

export class AppHealthInfrastructureServiceResponse
{
    constructor(
        public readonly id: string,
        public readonly providerId: string,
        public readonly name: string,
        public readonly score: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly provider: AppHealthInfrastructureProviderResponse,
    ) {}
}
