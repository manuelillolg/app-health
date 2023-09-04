import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationViewResponse } from '../../domain/app-health-application-view.response';
import { AppHealthApplicationViewMapper } from '../../domain/app-health-application-view.mapper';
import { AppHealthFindApplicationViewQuery } from './app-health-find-application-view.query';
import { AppHealthFindApplicationViewService } from './app-health-find-application-view.service';

@QueryHandler(AppHealthFindApplicationViewQuery)
export class AppHealthFindApplicationViewQueryHandler implements IQueryHandler<AppHealthFindApplicationViewQuery>
{
    private readonly mapper: AppHealthApplicationViewMapper = new AppHealthApplicationViewMapper();

    constructor(
        private readonly findApplicationViewService: AppHealthFindApplicationViewService,
    ) {}

    async execute(query: AppHealthFindApplicationViewQuery): Promise<AppHealthApplicationViewResponse>
    {
        const applicationView = await this.findApplicationViewService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationView);
    }
}
