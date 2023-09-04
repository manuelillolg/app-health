import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthDatabaseResponse } from '../../domain/app-health-database.response';
import { AppHealthDatabaseMapper } from '../../domain/app-health-database.mapper';
import { AppHealthFindDatabaseQuery } from './app-health-find-database.query';
import { AppHealthFindDatabaseService } from './app-health-find-database.service';

@QueryHandler(AppHealthFindDatabaseQuery)
export class AppHealthFindDatabaseQueryHandler implements IQueryHandler<AppHealthFindDatabaseQuery>
{
    private readonly mapper: AppHealthDatabaseMapper = new AppHealthDatabaseMapper();

    constructor(
        private readonly findDatabaseService: AppHealthFindDatabaseService,
    ) {}

    async execute(query: AppHealthFindDatabaseQuery): Promise<AppHealthDatabaseResponse>
    {
        const database = await this.findDatabaseService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(database);
    }
}
