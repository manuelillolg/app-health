import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationViewResponse } from '../../domain/app-health-application-view.response';
import { AppHealthApplicationViewMapper } from '../../domain/app-health-application-view.mapper';
import { AppHealthRawSQLApplicationViewsQuery } from './app-health-raw-sql-application-views.query';
import { AppHealthRawSQLApplicationViewsService } from './app-health-raw-sql-application-views.service';

@QueryHandler(AppHealthRawSQLApplicationViewsQuery)
export class AppHealthRawSQLApplicationViewsQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationViewsQuery>
{
    private readonly mapper: AppHealthApplicationViewMapper = new AppHealthApplicationViewMapper();

    constructor(
        private readonly rawSQLApplicationViewsService: AppHealthRawSQLApplicationViewsService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationViewsQuery): Promise<AppHealthApplicationViewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationViewsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
