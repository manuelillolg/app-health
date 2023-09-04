import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplication } from './app-health-application.aggregate';
import { AppHealthApplicationResponse } from './app-health-application.response';
import {
    AppHealthApplicationId,
    AppHealthApplicationTechnicalSolutionId,
    AppHealthApplicationName,
    AppHealthApplicationDescription,
    AppHealthApplicationBusinessImpact,
    AppHealthApplicationType,
    AppHealthApplicationReleaseDate,
    AppHealthApplicationArchitectureDiagram,
    AppHealthApplicationHasTenants,
    AppHealthApplicationHasLicensing,
    AppHealthApplicationCostLicensesPerYear,
    AppHealthApplicationRequestsPerDay,
    AppHealthApplicationCreatedAt,
    AppHealthApplicationUpdatedAt,
    AppHealthApplicationDeletedAt,
} from './value-objects';
import { AppHealthTechnicalSolutionMapper } from '@app/app-health/technical-solution';
import { AppHealthApplicationViewMapper } from '@app/app-health/application-view';
import { AppHealthApplicationAuthenticationMapper } from '@app/app-health/application-authentication';
import { AppHealthApplicationAuthorizationMapper } from '@app/app-health/application-authorization';
import { AppHealthApplicationLanguageMapper } from '@app/app-health/application-language';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service';
import { AppHealthApplicationDatabaseMapper } from '@app/app-health/application-database';
import { AppHealthApplicationApiMapper } from '@app/app-health/application-api';
import { AppHealthApplicationIntegrationMapper } from '@app/app-health/application-integration';

export class AppHealthApplicationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param application
     */
    mapModelToAggregate(application: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplication
    {
        if (!application) return;

        return this.makeAggregate(application, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applications
     */
    mapModelsToAggregates(applications: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplication[]
    {
        if (!Array.isArray(applications)) return;

        return applications.map(application => this.makeAggregate(application, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param application
     */
    mapAggregateToResponse(application: AppHealthApplication): AppHealthApplicationResponse
    {
        return this.makeResponse(application);
    }

    /**
     * Map array of aggregates to array responses
     * @param applications
     */
    mapAggregatesToResponses(applications: AppHealthApplication[]): AppHealthApplicationResponse[]
    {
        if (!Array.isArray(applications)) return;

        return applications.map(application => this.makeResponse(application));
    }

    private makeAggregate(application: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplication
    {
        return AppHealthApplication.register(
            new AppHealthApplicationId(application.id, { undefinable: true }),
            new AppHealthApplicationTechnicalSolutionId(application.technicalSolutionId, { undefinable: true }),
            new AppHealthApplicationName(application.name, { undefinable: true }),
            new AppHealthApplicationDescription(application.description, { undefinable: true }),
            new AppHealthApplicationBusinessImpact(application.businessImpact, { undefinable: true }),
            new AppHealthApplicationType(application.type, { undefinable: true }),
            new AppHealthApplicationReleaseDate(application.releaseDate, { undefinable: true }),
            new AppHealthApplicationArchitectureDiagram(application.architectureDiagram, { undefinable: true }),
            new AppHealthApplicationHasTenants(application.hasTenants, { undefinable: true }),
            new AppHealthApplicationHasLicensing(application.hasLicensing, { undefinable: true }),
            new AppHealthApplicationCostLicensesPerYear(application.costLicensesPerYear, { undefinable: true }),
            new AppHealthApplicationRequestsPerDay(application.requestsPerDay, { undefinable: true }),
            new AppHealthApplicationCreatedAt(application.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationUpdatedAt(application.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationDeletedAt(application.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthTechnicalSolutionMapper({ eagerLoading: true }).mapModelToAggregate(application.technicalSolution, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationViewMapper({ eagerLoading: true }).mapModelsToAggregates(application.views, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationAuthenticationMapper({ eagerLoading: true }).mapModelsToAggregates(application.authentications, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationAuthorizationMapper({ eagerLoading: true }).mapModelsToAggregates(application.authorizations, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationLanguageMapper({ eagerLoading: true }).mapModelsToAggregates(application.languages, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapModelsToAggregates(application.infrastructureServices, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationDatabaseMapper({ eagerLoading: true }).mapModelsToAggregates(application.databases, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationApiMapper({ eagerLoading: true }).mapModelsToAggregates(application.apis, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationIntegrationMapper({ eagerLoading: true }).mapModelsToAggregates(application.integrations, cQMetadata) : undefined,
        );
    }

    private makeResponse(application: AppHealthApplication): AppHealthApplicationResponse
    {
        if (!application) return;

        return new AppHealthApplicationResponse(
            application.id.value,
            application.technicalSolutionId.value,
            application.name.value,
            application.description.value,
            application.businessImpact.value,
            application.type.value,
            application.releaseDate.value,
            application.architectureDiagram.value,
            application.hasTenants.value,
            application.hasLicensing.value,
            application.costLicensesPerYear.value,
            application.requestsPerDay.value,
            application.createdAt.value,
            application.updatedAt.value,
            application.deletedAt.value,
            this.options.eagerLoading ? new AppHealthTechnicalSolutionMapper({ eagerLoading: true }).mapAggregateToResponse(application.technicalSolution) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationViewMapper({ eagerLoading: true }).mapAggregatesToResponses(application.views) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationAuthenticationMapper({ eagerLoading: true }).mapAggregatesToResponses(application.authentications) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationAuthorizationMapper({ eagerLoading: true }).mapAggregatesToResponses(application.authorizations) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationLanguageMapper({ eagerLoading: true }).mapAggregatesToResponses(application.languages) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapAggregatesToResponses(application.infrastructureServices) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationDatabaseMapper({ eagerLoading: true }).mapAggregatesToResponses(application.databases) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationApiMapper({ eagerLoading: true }).mapAggregatesToResponses(application.apis) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationIntegrationMapper({ eagerLoading: true }).mapAggregatesToResponses(application.integrations) : undefined,
        );
    }
}
