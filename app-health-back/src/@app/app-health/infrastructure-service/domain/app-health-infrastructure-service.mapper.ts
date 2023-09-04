import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthInfrastructureService } from './app-health-infrastructure-service.aggregate';
import { AppHealthInfrastructureServiceResponse } from './app-health-infrastructure-service.response';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from './value-objects';
import { AppHealthInfrastructureProviderMapper } from '@app/app-health/infrastructure-provider';

export class AppHealthInfrastructureServiceMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param infrastructureService
     */
    mapModelToAggregate(infrastructureService: LiteralObject, cQMetadata?: CQMetadata): AppHealthInfrastructureService
    {
        if (!infrastructureService) return;

        return this.makeAggregate(infrastructureService, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param infrastructureServices
     */
    mapModelsToAggregates(infrastructureServices: LiteralObject[], cQMetadata?: CQMetadata): AppHealthInfrastructureService[]
    {
        if (!Array.isArray(infrastructureServices)) return;

        return infrastructureServices.map(infrastructureService => this.makeAggregate(infrastructureService, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param infrastructureService
     */
    mapAggregateToResponse(infrastructureService: AppHealthInfrastructureService): AppHealthInfrastructureServiceResponse
    {
        return this.makeResponse(infrastructureService);
    }

    /**
     * Map array of aggregates to array responses
     * @param infrastructureServices
     */
    mapAggregatesToResponses(infrastructureServices: AppHealthInfrastructureService[]): AppHealthInfrastructureServiceResponse[]
    {
        if (!Array.isArray(infrastructureServices)) return;

        return infrastructureServices.map(infrastructureService => this.makeResponse(infrastructureService));
    }

    private makeAggregate(infrastructureService: LiteralObject, cQMetadata?: CQMetadata): AppHealthInfrastructureService
    {
        return AppHealthInfrastructureService.register(
            new AppHealthInfrastructureServiceId(infrastructureService.id, { undefinable: true }),
            new AppHealthInfrastructureServiceProviderId(infrastructureService.providerId, { undefinable: true }),
            new AppHealthInfrastructureServiceName(infrastructureService.name, { undefinable: true }),
            new AppHealthInfrastructureServiceScore(infrastructureService.score, { undefinable: true }),
            new AppHealthInfrastructureServiceCreatedAt(infrastructureService.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthInfrastructureServiceUpdatedAt(infrastructureService.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthInfrastructureServiceDeletedAt(infrastructureService.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthInfrastructureProviderMapper({ eagerLoading: true }).mapModelToAggregate(infrastructureService.provider, cQMetadata) : undefined,
        );
    }

    private makeResponse(infrastructureService: AppHealthInfrastructureService): AppHealthInfrastructureServiceResponse
    {
        if (!infrastructureService) return;

        return new AppHealthInfrastructureServiceResponse(
            infrastructureService.id.value,
            infrastructureService.providerId.value,
            infrastructureService.name.value,
            infrastructureService.score.value,
            infrastructureService.createdAt.value,
            infrastructureService.updatedAt.value,
            infrastructureService.deletedAt.value,
            this.options.eagerLoading ? new AppHealthInfrastructureProviderMapper({ eagerLoading: true }).mapAggregateToResponse(infrastructureService.provider) : undefined,
        );
    }
}
