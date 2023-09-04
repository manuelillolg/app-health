import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationIntegrationResponse } from '../../domain/app-health-application-integration.response';
import { AppHealthApplicationIntegrationMapper } from '../../domain/app-health-application-integration.mapper';
import { AppHealthRawSQLApplicationIntegrationsQuery } from './app-health-raw-sql-application-integrations.query';
import { AppHealthRawSQLApplicationIntegrationsService } from './app-health-raw-sql-application-integrations.service';

@QueryHandler(AppHealthRawSQLApplicationIntegrationsQuery)
export class AppHealthRawSQLApplicationIntegrationsQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationIntegrationsQuery>
{
    private readonly mapper: AppHealthApplicationIntegrationMapper = new AppHealthApplicationIntegrationMapper();

    constructor(
        private readonly rawSQLApplicationIntegrationsService: AppHealthRawSQLApplicationIntegrationsService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationIntegrationsQuery): Promise<AppHealthApplicationIntegrationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationIntegrationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
