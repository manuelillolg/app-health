import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationApiResponse } from '../../domain/app-health-application-api.response';
import { AppHealthApplicationApiMapper } from '../../domain/app-health-application-api.mapper';
import { AppHealthRawSQLApplicationApisQuery } from './app-health-raw-sql-application-apis.query';
import { AppHealthRawSQLApplicationApisService } from './app-health-raw-sql-application-apis.service';

@QueryHandler(AppHealthRawSQLApplicationApisQuery)
export class AppHealthRawSQLApplicationApisQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationApisQuery>
{
    private readonly mapper: AppHealthApplicationApiMapper = new AppHealthApplicationApiMapper();

    constructor(
        private readonly rawSQLApplicationApisService: AppHealthRawSQLApplicationApisService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationApisQuery): Promise<AppHealthApplicationApiResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationApisService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
