import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureProviderResponse } from '../../domain/app-health-infrastructure-provider.response';
import { AppHealthInfrastructureProviderMapper } from '../../domain/app-health-infrastructure-provider.mapper';
import { AppHealthFindInfrastructureProviderQuery } from './app-health-find-infrastructure-provider.query';
import { AppHealthFindInfrastructureProviderService } from './app-health-find-infrastructure-provider.service';

@QueryHandler(AppHealthFindInfrastructureProviderQuery)
export class AppHealthFindInfrastructureProviderQueryHandler implements IQueryHandler<AppHealthFindInfrastructureProviderQuery>
{
    private readonly mapper: AppHealthInfrastructureProviderMapper = new AppHealthInfrastructureProviderMapper();

    constructor(
        private readonly findInfrastructureProviderService: AppHealthFindInfrastructureProviderService,
    ) {}

    async execute(query: AppHealthFindInfrastructureProviderQuery): Promise<AppHealthInfrastructureProviderResponse>
    {
        const infrastructureProvider = await this.findInfrastructureProviderService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(infrastructureProvider);
    }
}
