import { AppHealthApplicationResponse } from '@app/app-health/application';
import { AppHealthAuthorizationInterfaceResponse } from '@app/app-health/authorization-interface';
import { AppHealthApplicationInfrastructureServiceResponse } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationAuthorizationResponse
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
        public readonly application: AppHealthApplicationResponse,
        public readonly authorizationInterface: AppHealthAuthorizationInterfaceResponse,
        public readonly applicationInfrastructureService: AppHealthApplicationInfrastructureServiceResponse,
    ) {}
}
