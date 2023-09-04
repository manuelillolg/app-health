import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthDatabaseResponse } from '../../domain/app-health-database.response';
import { AppHealthDatabaseMapper } from '../../domain/app-health-database.mapper';
import { AppHealthRawSQLDatabasesQuery } from './app-health-raw-sql-databases.query';
import { AppHealthRawSQLDatabasesService } from './app-health-raw-sql-databases.service';

@QueryHandler(AppHealthRawSQLDatabasesQuery)
export class AppHealthRawSQLDatabasesQueryHandler implements IQueryHandler<AppHealthRawSQLDatabasesQuery>
{
    private readonly mapper: AppHealthDatabaseMapper = new AppHealthDatabaseMapper();

    constructor(
        private readonly rawSQLDatabasesService: AppHealthRawSQLDatabasesService,
    ) {}

    async execute(query: AppHealthRawSQLDatabasesQuery): Promise<AppHealthDatabaseResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLDatabasesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
