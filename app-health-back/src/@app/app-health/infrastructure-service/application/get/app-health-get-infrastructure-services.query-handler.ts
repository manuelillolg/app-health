import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureServiceResponse } from '../../domain/app-health-infrastructure-service.response';
import { AppHealthInfrastructureServiceMapper } from '../../domain/app-health-infrastructure-service.mapper';
import { AppHealthGetInfrastructureServicesQuery } from './app-health-get-infrastructure-services.query';
import { AppHealthGetInfrastructureServicesService } from './app-health-get-infrastructure-services.service';

@QueryHandler(AppHealthGetInfrastructureServicesQuery)
export class AppHealthGetInfrastructureServicesQueryHandler implements IQueryHandler<AppHealthGetInfrastructureServicesQuery>
{
    private readonly mapper: AppHealthInfrastructureServiceMapper = new AppHealthInfrastructureServiceMapper();

    constructor(
        private readonly getInfrastructureServicesService: AppHealthGetInfrastructureServicesService,
    ) {}

    async execute(query: AppHealthGetInfrastructureServicesQuery): Promise<AppHealthInfrastructureServiceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getInfrastructureServicesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
