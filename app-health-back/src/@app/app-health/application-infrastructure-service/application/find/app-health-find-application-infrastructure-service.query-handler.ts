import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationInfrastructureServiceResponse } from '../../domain/app-health-application-infrastructure-service.response';
import { AppHealthApplicationInfrastructureServiceMapper } from '../../domain/app-health-application-infrastructure-service.mapper';
import { AppHealthFindApplicationInfrastructureServiceQuery } from './app-health-find-application-infrastructure-service.query';
import { AppHealthFindApplicationInfrastructureServiceService } from './app-health-find-application-infrastructure-service.service';

@QueryHandler(AppHealthFindApplicationInfrastructureServiceQuery)
export class AppHealthFindApplicationInfrastructureServiceQueryHandler implements IQueryHandler<AppHealthFindApplicationInfrastructureServiceQuery>
{
    private readonly mapper: AppHealthApplicationInfrastructureServiceMapper = new AppHealthApplicationInfrastructureServiceMapper();

    constructor(
        private readonly findApplicationInfrastructureServiceService: AppHealthFindApplicationInfrastructureServiceService,
    ) {}

    async execute(query: AppHealthFindApplicationInfrastructureServiceQuery): Promise<AppHealthApplicationInfrastructureServiceResponse>
    {
        const applicationInfrastructureService = await this.findApplicationInfrastructureServiceService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationInfrastructureService);
    }
}
