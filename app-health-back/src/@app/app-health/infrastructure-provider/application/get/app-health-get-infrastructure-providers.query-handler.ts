import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureProviderResponse } from '../../domain/app-health-infrastructure-provider.response';
import { AppHealthInfrastructureProviderMapper } from '../../domain/app-health-infrastructure-provider.mapper';
import { AppHealthGetInfrastructureProvidersQuery } from './app-health-get-infrastructure-providers.query';
import { AppHealthGetInfrastructureProvidersService } from './app-health-get-infrastructure-providers.service';

@QueryHandler(AppHealthGetInfrastructureProvidersQuery)
export class AppHealthGetInfrastructureProvidersQueryHandler implements IQueryHandler<AppHealthGetInfrastructureProvidersQuery>
{
    private readonly mapper: AppHealthInfrastructureProviderMapper = new AppHealthInfrastructureProviderMapper();

    constructor(
        private readonly getInfrastructureProvidersService: AppHealthGetInfrastructureProvidersService,
    ) {}

    async execute(query: AppHealthGetInfrastructureProvidersQuery): Promise<AppHealthInfrastructureProviderResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getInfrastructureProvidersService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
