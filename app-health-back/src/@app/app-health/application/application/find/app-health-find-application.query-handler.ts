import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationResponse } from '../../domain/app-health-application.response';
import { AppHealthApplicationMapper } from '../../domain/app-health-application.mapper';
import { AppHealthFindApplicationQuery } from './app-health-find-application.query';
import { AppHealthFindApplicationService } from './app-health-find-application.service';

@QueryHandler(AppHealthFindApplicationQuery)
export class AppHealthFindApplicationQueryHandler implements IQueryHandler<AppHealthFindApplicationQuery>
{
    private readonly mapper: AppHealthApplicationMapper = new AppHealthApplicationMapper();

    constructor(
        private readonly findApplicationService: AppHealthFindApplicationService,
    ) {}

    async execute(query: AppHealthFindApplicationQuery): Promise<AppHealthApplicationResponse>
    {
        const application = await this.findApplicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}
