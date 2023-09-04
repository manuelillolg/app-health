import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationDatabaseResponse } from '../../domain/app-health-application-database.response';
import { AppHealthApplicationDatabaseMapper } from '../../domain/app-health-application-database.mapper';
import { AppHealthGetApplicationDatabasesQuery } from './app-health-get-application-databases.query';
import { AppHealthGetApplicationDatabasesService } from './app-health-get-application-databases.service';

@QueryHandler(AppHealthGetApplicationDatabasesQuery)
export class AppHealthGetApplicationDatabasesQueryHandler implements IQueryHandler<AppHealthGetApplicationDatabasesQuery>
{
    private readonly mapper: AppHealthApplicationDatabaseMapper = new AppHealthApplicationDatabaseMapper();

    constructor(
        private readonly getApplicationDatabasesService: AppHealthGetApplicationDatabasesService,
    ) {}

    async execute(query: AppHealthGetApplicationDatabasesQuery): Promise<AppHealthApplicationDatabaseResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationDatabasesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
