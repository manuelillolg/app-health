import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationInfrastructureServiceResponse } from '../../domain/app-health-application-infrastructure-service.response';
import { AppHealthApplicationInfrastructureServiceMapper } from '../../domain/app-health-application-infrastructure-service.mapper';
import { AppHealthGetApplicationInfrastuctureServicesQuery } from './app-health-get-application-infrastucture-services.query';
import { AppHealthGetApplicationInfrastuctureServicesService } from './app-health-get-application-infrastucture-services.service';

@QueryHandler(AppHealthGetApplicationInfrastuctureServicesQuery)
export class AppHealthGetApplicationInfrastuctureServicesQueryHandler implements IQueryHandler<AppHealthGetApplicationInfrastuctureServicesQuery>
{
    private readonly mapper: AppHealthApplicationInfrastructureServiceMapper = new AppHealthApplicationInfrastructureServiceMapper();

    constructor(
        private readonly getApplicationInfrastuctureServicesService: AppHealthGetApplicationInfrastuctureServicesService,
    ) {}

    async execute(query: AppHealthGetApplicationInfrastuctureServicesQuery): Promise<AppHealthApplicationInfrastructureServiceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationInfrastuctureServicesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
