import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationIntegrationResponse } from '../../domain/app-health-application-integration.response';
import { AppHealthApplicationIntegrationMapper } from '../../domain/app-health-application-integration.mapper';
import { AppHealthApplicationIntegrationId } from '../../domain/value-objects';
import { AppHealthFindApplicationIntegrationByIdQuery } from './app-health-find-application-integration-by-id.query';
import { AppHealthFindApplicationIntegrationByIdService } from './app-health-find-application-integration-by-id.service';

@QueryHandler(AppHealthFindApplicationIntegrationByIdQuery)
export class AppHealthFindApplicationIntegrationByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationIntegrationByIdQuery>
{
    private readonly mapper: AppHealthApplicationIntegrationMapper = new AppHealthApplicationIntegrationMapper();

    constructor(
        private readonly findApplicationIntegrationByIdService: AppHealthFindApplicationIntegrationByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationIntegrationByIdQuery): Promise<AppHealthApplicationIntegrationResponse>
    {
        const applicationIntegration = await this.findApplicationIntegrationByIdService.main(
            new AppHealthApplicationIntegrationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationIntegration);
    }
}
