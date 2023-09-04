import { AppHealthApplicationResponse } from '@app/app-health/application';
import { AppHealthApiInterfaceTypeResponse } from '@app/app-health/api-interface-type';
import { AppHealthApplicationInfrastructureServiceResponse } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationApiResponse
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
        public readonly application: AppHealthApplicationResponse,
        public readonly apiInterfaceType: AppHealthApiInterfaceTypeResponse,
        public readonly applicationInfrastructureService: AppHealthApplicationInfrastructureServiceResponse,
    ) {}
}
