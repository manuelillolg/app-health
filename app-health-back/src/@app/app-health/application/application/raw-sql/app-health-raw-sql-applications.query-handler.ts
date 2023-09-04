import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationResponse } from '../../domain/app-health-application.response';
import { AppHealthApplicationMapper } from '../../domain/app-health-application.mapper';
import { AppHealthRawSQLApplicationsQuery } from './app-health-raw-sql-applications.query';
import { AppHealthRawSQLApplicationsService } from './app-health-raw-sql-applications.service';

@QueryHandler(AppHealthRawSQLApplicationsQuery)
export class AppHealthRawSQLApplicationsQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationsQuery>
{
    private readonly mapper: AppHealthApplicationMapper = new AppHealthApplicationMapper();

    constructor(
        private readonly rawSQLApplicationsService: AppHealthRawSQLApplicationsService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationsQuery): Promise<AppHealthApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
