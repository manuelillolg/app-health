import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureProviderResponse } from '../../domain/app-health-infrastructure-provider.response';
import { AppHealthInfrastructureProviderMapper } from '../../domain/app-health-infrastructure-provider.mapper';
import { AppHealthInfrastructureProviderId } from '../../domain/value-objects';
import { AppHealthFindInfrastructureProviderByIdQuery } from './app-health-find-infrastructure-provider-by-id.query';
import { AppHealthFindInfrastructureProviderByIdService } from './app-health-find-infrastructure-provider-by-id.service';

@QueryHandler(AppHealthFindInfrastructureProviderByIdQuery)
export class AppHealthFindInfrastructureProviderByIdQueryHandler implements IQueryHandler<AppHealthFindInfrastructureProviderByIdQuery>
{
    private readonly mapper: AppHealthInfrastructureProviderMapper = new AppHealthInfrastructureProviderMapper();

    constructor(
        private readonly findInfrastructureProviderByIdService: AppHealthFindInfrastructureProviderByIdService,
    ) {}

    async execute(query: AppHealthFindInfrastructureProviderByIdQuery): Promise<AppHealthInfrastructureProviderResponse>
    {
        const infrastructureProvider = await this.findInfrastructureProviderByIdService.main(
            new AppHealthInfrastructureProviderId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(infrastructureProvider);
    }
}
