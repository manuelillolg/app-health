import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureServiceResponse } from '../../domain/app-health-infrastructure-service.response';
import { AppHealthInfrastructureServiceMapper } from '../../domain/app-health-infrastructure-service.mapper';
import { AppHealthInfrastructureServiceId } from '../../domain/value-objects';
import { AppHealthFindInfrastructureServiceByIdQuery } from './app-health-find-infrastructure-service-by-id.query';
import { AppHealthFindInfrastructureServiceByIdService } from './app-health-find-infrastructure-service-by-id.service';

@QueryHandler(AppHealthFindInfrastructureServiceByIdQuery)
export class AppHealthFindInfrastructureServiceByIdQueryHandler implements IQueryHandler<AppHealthFindInfrastructureServiceByIdQuery>
{
    private readonly mapper: AppHealthInfrastructureServiceMapper = new AppHealthInfrastructureServiceMapper();

    constructor(
        private readonly findInfrastructureServiceByIdService: AppHealthFindInfrastructureServiceByIdService,
    ) {}

    async execute(query: AppHealthFindInfrastructureServiceByIdQuery): Promise<AppHealthInfrastructureServiceResponse>
    {
        const infrastructureService = await this.findInfrastructureServiceByIdService.main(
            new AppHealthInfrastructureServiceId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(infrastructureService);
    }
}
