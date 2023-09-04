import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationInfrastructureServiceResponse } from '../../domain/app-health-application-infrastructure-service.response';
import { AppHealthApplicationInfrastructureServiceMapper } from '../../domain/app-health-application-infrastructure-service.mapper';
import { AppHealthRawSQLApplicationInfrastuctureServicesQuery } from './app-health-raw-sql-application-infrastucture-services.query';
import { AppHealthRawSQLApplicationInfrastuctureServicesService } from './app-health-raw-sql-application-infrastucture-services.service';

@QueryHandler(AppHealthRawSQLApplicationInfrastuctureServicesQuery)
export class AppHealthRawSQLApplicationInfrastuctureServicesQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationInfrastuctureServicesQuery>
{
    private readonly mapper: AppHealthApplicationInfrastructureServiceMapper = new AppHealthApplicationInfrastructureServiceMapper();

    constructor(
        private readonly rawSQLApplicationInfrastuctureServicesService: AppHealthRawSQLApplicationInfrastuctureServicesService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationInfrastuctureServicesQuery): Promise<AppHealthApplicationInfrastructureServiceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationInfrastuctureServicesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
