import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureProviderResponse } from '../../domain/app-health-infrastructure-provider.response';
import { AppHealthInfrastructureProviderMapper } from '../../domain/app-health-infrastructure-provider.mapper';
import { AppHealthRawSQLInfrastructureProvidersQuery } from './app-health-raw-sql-infrastructure-providers.query';
import { AppHealthRawSQLInfrastructureProvidersService } from './app-health-raw-sql-infrastructure-providers.service';

@QueryHandler(AppHealthRawSQLInfrastructureProvidersQuery)
export class AppHealthRawSQLInfrastructureProvidersQueryHandler implements IQueryHandler<AppHealthRawSQLInfrastructureProvidersQuery>
{
    private readonly mapper: AppHealthInfrastructureProviderMapper = new AppHealthInfrastructureProviderMapper();

    constructor(
        private readonly rawSQLInfrastructureProvidersService: AppHealthRawSQLInfrastructureProvidersService,
    ) {}

    async execute(query: AppHealthRawSQLInfrastructureProvidersQuery): Promise<AppHealthInfrastructureProviderResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLInfrastructureProvidersService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
