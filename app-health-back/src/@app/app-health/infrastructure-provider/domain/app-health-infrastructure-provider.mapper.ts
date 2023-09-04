import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthInfrastructureProvider } from './app-health-infrastructure-provider.aggregate';
import { AppHealthInfrastructureProviderResponse } from './app-health-infrastructure-provider.response';
import {
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderUpdatedAt,
    AppHealthInfrastructureProviderDeletedAt,
} from './value-objects';

export class AppHealthInfrastructureProviderMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param infrastructureProvider
     */
    mapModelToAggregate(infrastructureProvider: LiteralObject, cQMetadata?: CQMetadata): AppHealthInfrastructureProvider
    {
        if (!infrastructureProvider) return;

        return this.makeAggregate(infrastructureProvider, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param infrastructureProviders
     */
    mapModelsToAggregates(infrastructureProviders: LiteralObject[], cQMetadata?: CQMetadata): AppHealthInfrastructureProvider[]
    {
        if (!Array.isArray(infrastructureProviders)) return;

        return infrastructureProviders.map(infrastructureProvider => this.makeAggregate(infrastructureProvider, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param infrastructureProvider
     */
    mapAggregateToResponse(infrastructureProvider: AppHealthInfrastructureProvider): AppHealthInfrastructureProviderResponse
    {
        return this.makeResponse(infrastructureProvider);
    }

    /**
     * Map array of aggregates to array responses
     * @param infrastructureProviders
     */
    mapAggregatesToResponses(infrastructureProviders: AppHealthInfrastructureProvider[]): AppHealthInfrastructureProviderResponse[]
    {
        if (!Array.isArray(infrastructureProviders)) return;

        return infrastructureProviders.map(infrastructureProvider => this.makeResponse(infrastructureProvider));
    }

    private makeAggregate(infrastructureProvider: LiteralObject, cQMetadata?: CQMetadata): AppHealthInfrastructureProvider
    {
        return AppHealthInfrastructureProvider.register(
            new AppHealthInfrastructureProviderId(infrastructureProvider.id, { undefinable: true }),
            new AppHealthInfrastructureProviderName(infrastructureProvider.name, { undefinable: true }),
            new AppHealthInfrastructureProviderScore(infrastructureProvider.score, { undefinable: true }),
            new AppHealthInfrastructureProviderCreatedAt(infrastructureProvider.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthInfrastructureProviderUpdatedAt(infrastructureProvider.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthInfrastructureProviderDeletedAt(infrastructureProvider.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(infrastructureProvider: AppHealthInfrastructureProvider): AppHealthInfrastructureProviderResponse
    {
        if (!infrastructureProvider) return;

        return new AppHealthInfrastructureProviderResponse(
            infrastructureProvider.id.value,
            infrastructureProvider.name.value,
            infrastructureProvider.score.value,
            infrastructureProvider.createdAt.value,
            infrastructureProvider.updatedAt.value,
            infrastructureProvider.deletedAt.value,
        );
    }
}
