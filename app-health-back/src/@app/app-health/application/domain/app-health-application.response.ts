import { AppHealthTechnicalSolutionResponse } from '@app/app-health/technical-solution';
import { AppHealthApplicationViewResponse } from '@app/app-health/application-view';
import { AppHealthApplicationAuthenticationResponse } from '@app/app-health/application-authentication';
import { AppHealthApplicationAuthorizationResponse } from '@app/app-health/application-authorization';
import { AppHealthApplicationLanguageResponse } from '@app/app-health/application-language';
import { AppHealthApplicationInfrastructureServiceResponse } from '@app/app-health/application-infrastructure-service';
import { AppHealthApplicationDatabaseResponse } from '@app/app-health/application-database';
import { AppHealthApplicationApiResponse } from '@app/app-health/application-api';
import { AppHealthApplicationIntegrationResponse } from '@app/app-health/application-integration';

export class AppHealthApplicationResponse
{
    constructor(
        public readonly id: string,
        public readonly technicalSolutionId: string,
        public readonly name: string,
        public readonly description: string,
        public readonly businessImpact: string,
        public readonly type: string,
        public readonly releaseDate: string,
        public readonly architectureDiagram: string,
        public readonly hasTenants: boolean,
        public readonly hasLicensing: boolean,
        public readonly costLicensesPerYear: number,
        public readonly requestsPerDay: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly technicalSolution: AppHealthTechnicalSolutionResponse,
        public readonly views: AppHealthApplicationViewResponse[],
        public readonly authentications: AppHealthApplicationAuthenticationResponse[],
        public readonly authorizations: AppHealthApplicationAuthorizationResponse[],
        public readonly languages: AppHealthApplicationLanguageResponse[],
        public readonly infrastructureServices: AppHealthApplicationInfrastructureServiceResponse[],
        public readonly databases: AppHealthApplicationDatabaseResponse[],
        public readonly apis: AppHealthApplicationApiResponse[],
        public readonly integrations: AppHealthApplicationIntegrationResponse[],
    ) {}
}
