import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureServiceResponse } from '../../domain/app-health-infrastructure-service.response';
import { AppHealthInfrastructureServiceMapper } from '../../domain/app-health-infrastructure-service.mapper';
import { AppHealthFindInfrastructureServiceQuery } from './app-health-find-infrastructure-service.query';
import { AppHealthFindInfrastructureServiceService } from './app-health-find-infrastructure-service.service';

@QueryHandler(AppHealthFindInfrastructureServiceQuery)
export class AppHealthFindInfrastructureServiceQueryHandler implements IQueryHandler<AppHealthFindInfrastructureServiceQuery>
{
    private readonly mapper: AppHealthInfrastructureServiceMapper = new AppHealthInfrastructureServiceMapper();

    constructor(
        private readonly findInfrastructureServiceService: AppHealthFindInfrastructureServiceService,
    ) {}

    async execute(query: AppHealthFindInfrastructureServiceQuery): Promise<AppHealthInfrastructureServiceResponse>
    {
        const infrastructureService = await this.findInfrastructureServiceService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(infrastructureService);
    }
}
