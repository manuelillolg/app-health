import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthInfrastructureServiceResponse } from '../../domain/app-health-infrastructure-service.response';
import { AppHealthInfrastructureServiceMapper } from '../../domain/app-health-infrastructure-service.mapper';
import { AppHealthRawSQLInfrastructureServicesQuery } from './app-health-raw-sql-infrastructure-services.query';
import { AppHealthRawSQLInfrastructureServicesService } from './app-health-raw-sql-infrastructure-services.service';

@QueryHandler(AppHealthRawSQLInfrastructureServicesQuery)
export class AppHealthRawSQLInfrastructureServicesQueryHandler implements IQueryHandler<AppHealthRawSQLInfrastructureServicesQuery>
{
    private readonly mapper: AppHealthInfrastructureServiceMapper = new AppHealthInfrastructureServiceMapper();

    constructor(
        private readonly rawSQLInfrastructureServicesService: AppHealthRawSQLInfrastructureServicesService,
    ) {}

    async execute(query: AppHealthRawSQLInfrastructureServicesQuery): Promise<AppHealthInfrastructureServiceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLInfrastructureServicesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
