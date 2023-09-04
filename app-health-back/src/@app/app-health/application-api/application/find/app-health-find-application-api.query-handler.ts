import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationApiResponse } from '../../domain/app-health-application-api.response';
import { AppHealthApplicationApiMapper } from '../../domain/app-health-application-api.mapper';
import { AppHealthFindApplicationApiQuery } from './app-health-find-application-api.query';
import { AppHealthFindApplicationApiService } from './app-health-find-application-api.service';

@QueryHandler(AppHealthFindApplicationApiQuery)
export class AppHealthFindApplicationApiQueryHandler implements IQueryHandler<AppHealthFindApplicationApiQuery>
{
    private readonly mapper: AppHealthApplicationApiMapper = new AppHealthApplicationApiMapper();

    constructor(
        private readonly findApplicationApiService: AppHealthFindApplicationApiService,
    ) {}

    async execute(query: AppHealthFindApplicationApiQuery): Promise<AppHealthApplicationApiResponse>
    {
        const applicationApi = await this.findApplicationApiService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationApi);
    }
}
