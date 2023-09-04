import { AppHealthApplicationResponse } from '@app/app-health/application';
import { AppHealthInfrastructureServiceResponse } from '@app/app-health/infrastructure-service';

export class AppHealthApplicationInfrastructureServiceResponse
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
        public readonly application: AppHealthApplicationResponse,
        public readonly infrastructureService: AppHealthInfrastructureServiceResponse,
    ) {}
}
