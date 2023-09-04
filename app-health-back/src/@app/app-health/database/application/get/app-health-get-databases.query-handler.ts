import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthDatabaseResponse } from '../../domain/app-health-database.response';
import { AppHealthDatabaseMapper } from '../../domain/app-health-database.mapper';
import { AppHealthGetDatabasesQuery } from './app-health-get-databases.query';
import { AppHealthGetDatabasesService } from './app-health-get-databases.service';

@QueryHandler(AppHealthGetDatabasesQuery)
export class AppHealthGetDatabasesQueryHandler implements IQueryHandler<AppHealthGetDatabasesQuery>
{
    private readonly mapper: AppHealthDatabaseMapper = new AppHealthDatabaseMapper();

    constructor(
        private readonly getDatabasesService: AppHealthGetDatabasesService,
    ) {}

    async execute(query: AppHealthGetDatabasesQuery): Promise<AppHealthDatabaseResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getDatabasesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
