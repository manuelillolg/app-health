import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationDatabaseResponse } from '../../domain/app-health-application-database.response';
import { AppHealthApplicationDatabaseMapper } from '../../domain/app-health-application-database.mapper';
import { AppHealthRawSQLApplicationDatabasesQuery } from './app-health-raw-sql-application-databases.query';
import { AppHealthRawSQLApplicationDatabasesService } from './app-health-raw-sql-application-databases.service';

@QueryHandler(AppHealthRawSQLApplicationDatabasesQuery)
export class AppHealthRawSQLApplicationDatabasesQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationDatabasesQuery>
{
    private readonly mapper: AppHealthApplicationDatabaseMapper = new AppHealthApplicationDatabaseMapper();

    constructor(
        private readonly rawSQLApplicationDatabasesService: AppHealthRawSQLApplicationDatabasesService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationDatabasesQuery): Promise<AppHealthApplicationDatabaseResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationDatabasesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
