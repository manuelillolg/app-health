import { AppHealthApplicationResponse } from '@app/app-health/application';
import { AppHealthAuthenticationInterfaceResponse } from '@app/app-health/authentication-interface';
import { AppHealthApplicationInfrastructureServiceResponse } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationAuthenticationResponse
{
    constructor(
        public readonly id: string,
        public readonly applicationId: string,
        public readonly authenticationInterfaceId: string,
        public readonly totalUsers: number,
        public readonly score: number,
        public readonly applicationInfrastructureServiceId: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly application: AppHealthApplicationResponse,
        public readonly authenticationInterface: AppHealthAuthenticationInterfaceResponse,
        public readonly applicationInfrastructureService: AppHealthApplicationInfrastructureServiceResponse,
    ) {}
}
