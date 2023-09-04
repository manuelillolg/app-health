import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationInfrastructureService } from './app-health-application-infrastructure-service.aggregate';
import { AppHealthApplicationInfrastructureServiceResponse } from './app-health-application-infrastructure-service.response';
import {
    AppHealthApplicationInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceApplicationId,
    AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceAverageCostPerYear,
    AppHealthApplicationInfrastructureServiceScore,
    AppHealthApplicationInfrastructureServiceCreatedAt,
    AppHealthApplicationInfrastructureServiceUpdatedAt,
    AppHealthApplicationInfrastructureServiceDeletedAt,
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';
import { AppHealthInfrastructureServiceMapper } from '@app/app-health/infrastructure-service';

export class AppHealthApplicationInfrastructureServiceMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationInfrastructureService
     */
    mapModelToAggregate(applicationInfrastructureService: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationInfrastructureService
    {
        if (!applicationInfrastructureService) return;

        return this.makeAggregate(applicationInfrastructureService, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationInfrastuctureServices
     */
    mapModelsToAggregates(applicationInfrastuctureServices: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationInfrastructureService[]
    {
        if (!Array.isArray(applicationInfrastuctureServices)) return;

        return applicationInfrastuctureServices.map(applicationInfrastructureService => this.makeAggregate(applicationInfrastructureService, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationInfrastructureService
     */
    mapAggregateToResponse(applicationInfrastructureService: AppHealthApplicationInfrastructureService): AppHealthApplicationInfrastructureServiceResponse
    {
        return this.makeResponse(applicationInfrastructureService);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationInfrastuctureServices
     */
    mapAggregatesToResponses(applicationInfrastuctureServices: AppHealthApplicationInfrastructureService[]): AppHealthApplicationInfrastructureServiceResponse[]
    {
        if (!Array.isArray(applicationInfrastuctureServices)) return;

        return applicationInfrastuctureServices.map(applicationInfrastructureService => this.makeResponse(applicationInfrastructureService));
    }

    private makeAggregate(applicationInfrastructureService: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationInfrastructureService
    {
        return AppHealthApplicationInfrastructureService.register(
            new AppHealthApplicationInfrastructureServiceId(applicationInfrastructureService.id, { undefinable: true }),
            new AppHealthApplicationInfrastructureServiceApplicationId(applicationInfrastructureService.applicationId, { undefinable: true }),
            new AppHealthApplicationInfrastructureServiceInfrastructureServiceId(applicationInfrastructureService.infrastructureServiceId, { undefinable: true }),
            new AppHealthApplicationInfrastructureServiceAverageCostPerYear(applicationInfrastructureService.averageCostPerYear, { undefinable: true }),
            new AppHealthApplicationInfrastructureServiceScore(applicationInfrastructureService.score, { undefinable: true }),
            new AppHealthApplicationInfrastructureServiceCreatedAt(applicationInfrastructureService.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationInfrastructureServiceUpdatedAt(applicationInfrastructureService.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationInfrastructureServiceDeletedAt(applicationInfrastructureService.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationInfrastructureService.application, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthInfrastructureServiceMapper({ eagerLoading: true }).mapModelToAggregate(applicationInfrastructureService.infrastructureService, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationInfrastructureService: AppHealthApplicationInfrastructureService): AppHealthApplicationInfrastructureServiceResponse
    {
        if (!applicationInfrastructureService) return;

        return new AppHealthApplicationInfrastructureServiceResponse(
            applicationInfrastructureService.id.value,
            applicationInfrastructureService.applicationId.value,
            applicationInfrastructureService.infrastructureServiceId.value,
            applicationInfrastructureService.averageCostPerYear.value,
            applicationInfrastructureService.score.value,
            applicationInfrastructureService.createdAt.value,
            applicationInfrastructureService.updatedAt.value,
            applicationInfrastructureService.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationInfrastructureService.application) : undefined,
            this.options.eagerLoading ? new AppHealthInfrastructureServiceMapper({ eagerLoading: true }).mapAggregateToResponse(applicationInfrastructureService.infrastructureService) : undefined,
        );
    }
}
