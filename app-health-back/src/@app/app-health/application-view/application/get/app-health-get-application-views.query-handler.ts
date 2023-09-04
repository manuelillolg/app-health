import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationViewResponse } from '../../domain/app-health-application-view.response';
import { AppHealthApplicationViewMapper } from '../../domain/app-health-application-view.mapper';
import { AppHealthGetApplicationViewsQuery } from './app-health-get-application-views.query';
import { AppHealthGetApplicationViewsService } from './app-health-get-application-views.service';

@QueryHandler(AppHealthGetApplicationViewsQuery)
export class AppHealthGetApplicationViewsQueryHandler implements IQueryHandler<AppHealthGetApplicationViewsQuery>
{
    private readonly mapper: AppHealthApplicationViewMapper = new AppHealthApplicationViewMapper();

    constructor(
        private readonly getApplicationViewsService: AppHealthGetApplicationViewsService,
    ) {}

    async execute(query: AppHealthGetApplicationViewsQuery): Promise<AppHealthApplicationViewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationViewsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
