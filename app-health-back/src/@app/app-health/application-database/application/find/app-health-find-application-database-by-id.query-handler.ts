import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationDatabaseResponse } from '../../domain/app-health-application-database.response';
import { AppHealthApplicationDatabaseMapper } from '../../domain/app-health-application-database.mapper';
import { AppHealthApplicationDatabaseId } from '../../domain/value-objects';
import { AppHealthFindApplicationDatabaseByIdQuery } from './app-health-find-application-database-by-id.query';
import { AppHealthFindApplicationDatabaseByIdService } from './app-health-find-application-database-by-id.service';

@QueryHandler(AppHealthFindApplicationDatabaseByIdQuery)
export class AppHealthFindApplicationDatabaseByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationDatabaseByIdQuery>
{
    private readonly mapper: AppHealthApplicationDatabaseMapper = new AppHealthApplicationDatabaseMapper();

    constructor(
        private readonly findApplicationDatabaseByIdService: AppHealthFindApplicationDatabaseByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationDatabaseByIdQuery): Promise<AppHealthApplicationDatabaseResponse>
    {
        const applicationDatabase = await this.findApplicationDatabaseByIdService.main(
            new AppHealthApplicationDatabaseId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationDatabase);
    }
}
