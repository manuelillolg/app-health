import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationViewResponse } from '../../domain/app-health-application-view.response';
import { AppHealthApplicationViewMapper } from '../../domain/app-health-application-view.mapper';
import { AppHealthApplicationViewId } from '../../domain/value-objects';
import { AppHealthFindApplicationViewByIdQuery } from './app-health-find-application-view-by-id.query';
import { AppHealthFindApplicationViewByIdService } from './app-health-find-application-view-by-id.service';

@QueryHandler(AppHealthFindApplicationViewByIdQuery)
export class AppHealthFindApplicationViewByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationViewByIdQuery>
{
    private readonly mapper: AppHealthApplicationViewMapper = new AppHealthApplicationViewMapper();

    constructor(
        private readonly findApplicationViewByIdService: AppHealthFindApplicationViewByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationViewByIdQuery): Promise<AppHealthApplicationViewResponse>
    {
        const applicationView = await this.findApplicationViewByIdService.main(
            new AppHealthApplicationViewId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationView);
    }
}
