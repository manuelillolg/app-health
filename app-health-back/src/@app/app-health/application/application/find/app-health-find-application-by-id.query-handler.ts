import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationResponse } from '../../domain/app-health-application.response';
import { AppHealthApplicationMapper } from '../../domain/app-health-application.mapper';
import { AppHealthApplicationId } from '../../domain/value-objects';
import { AppHealthFindApplicationByIdQuery } from './app-health-find-application-by-id.query';
import { AppHealthFindApplicationByIdService } from './app-health-find-application-by-id.service';

@QueryHandler(AppHealthFindApplicationByIdQuery)
export class AppHealthFindApplicationByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationByIdQuery>
{
    private readonly mapper: AppHealthApplicationMapper = new AppHealthApplicationMapper();

    constructor(
        private readonly findApplicationByIdService: AppHealthFindApplicationByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationByIdQuery): Promise<AppHealthApplicationResponse>
    {
        const application = await this.findApplicationByIdService.main(
            new AppHealthApplicationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(application);
    }
}
