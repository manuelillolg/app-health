import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthDatabaseResponse } from '../../domain/app-health-database.response';
import { AppHealthDatabaseMapper } from '../../domain/app-health-database.mapper';
import { AppHealthDatabaseId } from '../../domain/value-objects';
import { AppHealthFindDatabaseByIdQuery } from './app-health-find-database-by-id.query';
import { AppHealthFindDatabaseByIdService } from './app-health-find-database-by-id.service';

@QueryHandler(AppHealthFindDatabaseByIdQuery)
export class AppHealthFindDatabaseByIdQueryHandler implements IQueryHandler<AppHealthFindDatabaseByIdQuery>
{
    private readonly mapper: AppHealthDatabaseMapper = new AppHealthDatabaseMapper();

    constructor(
        private readonly findDatabaseByIdService: AppHealthFindDatabaseByIdService,
    ) {}

    async execute(query: AppHealthFindDatabaseByIdQuery): Promise<AppHealthDatabaseResponse>
    {
        const database = await this.findDatabaseByIdService.main(
            new AppHealthDatabaseId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(database);
    }
}
