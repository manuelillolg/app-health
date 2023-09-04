import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationInfrastructureServiceResponse } from '../../domain/app-health-application-infrastructure-service.response';
import { AppHealthApplicationInfrastructureServiceMapper } from '../../domain/app-health-application-infrastructure-service.mapper';
import { AppHealthApplicationInfrastructureServiceId } from '../../domain/value-objects';
import { AppHealthFindApplicationInfrastructureServiceByIdQuery } from './app-health-find-application-infrastructure-service-by-id.query';
import { AppHealthFindApplicationInfrastructureServiceByIdService } from './app-health-find-application-infrastructure-service-by-id.service';

@QueryHandler(AppHealthFindApplicationInfrastructureServiceByIdQuery)
export class AppHealthFindApplicationInfrastructureServiceByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationInfrastructureServiceByIdQuery>
{
    private readonly mapper: AppHealthApplicationInfrastructureServiceMapper = new AppHealthApplicationInfrastructureServiceMapper();

    constructor(
        private readonly findApplicationInfrastructureServiceByIdService: AppHealthFindApplicationInfrastructureServiceByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationInfrastructureServiceByIdQuery): Promise<AppHealthApplicationInfrastructureServiceResponse>
    {
        const applicationInfrastructureService = await this.findApplicationInfrastructureServiceByIdService.main(
            new AppHealthApplicationInfrastructureServiceId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationInfrastructureService);
    }
}
