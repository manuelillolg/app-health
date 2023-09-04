import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationDatabaseResponse } from '../../domain/app-health-application-database.response';
import { AppHealthApplicationDatabaseMapper } from '../../domain/app-health-application-database.mapper';
import { AppHealthFindApplicationDatabaseQuery } from './app-health-find-application-database.query';
import { AppHealthFindApplicationDatabaseService } from './app-health-find-application-database.service';

@QueryHandler(AppHealthFindApplicationDatabaseQuery)
export class AppHealthFindApplicationDatabaseQueryHandler implements IQueryHandler<AppHealthFindApplicationDatabaseQuery>
{
    private readonly mapper: AppHealthApplicationDatabaseMapper = new AppHealthApplicationDatabaseMapper();

    constructor(
        private readonly findApplicationDatabaseService: AppHealthFindApplicationDatabaseService,
    ) {}

    async execute(query: AppHealthFindApplicationDatabaseQuery): Promise<AppHealthApplicationDatabaseResponse>
    {
        const applicationDatabase = await this.findApplicationDatabaseService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationDatabase);
    }
}
