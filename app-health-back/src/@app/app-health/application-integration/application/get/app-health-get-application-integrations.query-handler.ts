import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationIntegrationResponse } from '../../domain/app-health-application-integration.response';
import { AppHealthApplicationIntegrationMapper } from '../../domain/app-health-application-integration.mapper';
import { AppHealthGetApplicationIntegrationsQuery } from './app-health-get-application-integrations.query';
import { AppHealthGetApplicationIntegrationsService } from './app-health-get-application-integrations.service';

@QueryHandler(AppHealthGetApplicationIntegrationsQuery)
export class AppHealthGetApplicationIntegrationsQueryHandler implements IQueryHandler<AppHealthGetApplicationIntegrationsQuery>
{
    private readonly mapper: AppHealthApplicationIntegrationMapper = new AppHealthApplicationIntegrationMapper();

    constructor(
        private readonly getApplicationIntegrationsService: AppHealthGetApplicationIntegrationsService,
    ) {}

    async execute(query: AppHealthGetApplicationIntegrationsQuery): Promise<AppHealthApplicationIntegrationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationIntegrationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
