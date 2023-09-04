import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationApiResponse } from '../../domain/app-health-application-api.response';
import { AppHealthApplicationApiMapper } from '../../domain/app-health-application-api.mapper';
import { AppHealthApplicationApiId } from '../../domain/value-objects';
import { AppHealthFindApplicationApiByIdQuery } from './app-health-find-application-api-by-id.query';
import { AppHealthFindApplicationApiByIdService } from './app-health-find-application-api-by-id.service';

@QueryHandler(AppHealthFindApplicationApiByIdQuery)
export class AppHealthFindApplicationApiByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationApiByIdQuery>
{
    private readonly mapper: AppHealthApplicationApiMapper = new AppHealthApplicationApiMapper();

    constructor(
        private readonly findApplicationApiByIdService: AppHealthFindApplicationApiByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationApiByIdQuery): Promise<AppHealthApplicationApiResponse>
    {
        const applicationApi = await this.findApplicationApiByIdService.main(
            new AppHealthApplicationApiId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationApi);
    }
}
