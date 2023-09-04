import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationApiResponse } from '../../domain/app-health-application-api.response';
import { AppHealthApplicationApiMapper } from '../../domain/app-health-application-api.mapper';
import { AppHealthGetApplicationApisQuery } from './app-health-get-application-apis.query';
import { AppHealthGetApplicationApisService } from './app-health-get-application-apis.service';

@QueryHandler(AppHealthGetApplicationApisQuery)
export class AppHealthGetApplicationApisQueryHandler implements IQueryHandler<AppHealthGetApplicationApisQuery>
{
    private readonly mapper: AppHealthApplicationApiMapper = new AppHealthApplicationApiMapper();

    constructor(
        private readonly getApplicationApisService: AppHealthGetApplicationApisService,
    ) {}

    async execute(query: AppHealthGetApplicationApisQuery): Promise<AppHealthApplicationApiResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationApisService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
