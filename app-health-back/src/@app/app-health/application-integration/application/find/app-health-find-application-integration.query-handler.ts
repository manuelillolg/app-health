import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationIntegrationResponse } from '../../domain/app-health-application-integration.response';
import { AppHealthApplicationIntegrationMapper } from '../../domain/app-health-application-integration.mapper';
import { AppHealthFindApplicationIntegrationQuery } from './app-health-find-application-integration.query';
import { AppHealthFindApplicationIntegrationService } from './app-health-find-application-integration.service';

@QueryHandler(AppHealthFindApplicationIntegrationQuery)
export class AppHealthFindApplicationIntegrationQueryHandler implements IQueryHandler<AppHealthFindApplicationIntegrationQuery>
{
    private readonly mapper: AppHealthApplicationIntegrationMapper = new AppHealthApplicationIntegrationMapper();

    constructor(
        private readonly findApplicationIntegrationService: AppHealthFindApplicationIntegrationService,
    ) {}

    async execute(query: AppHealthFindApplicationIntegrationQuery): Promise<AppHealthApplicationIntegrationResponse>
    {
        const applicationIntegration = await this.findApplicationIntegrationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationIntegration);
    }
}
