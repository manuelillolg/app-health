import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationResponse } from '../../domain/app-health-application.response';
import { AppHealthApplicationMapper } from '../../domain/app-health-application.mapper';
import { AppHealthGetApplicationsQuery } from './app-health-get-applications.query';
import { AppHealthGetApplicationsService } from './app-health-get-applications.service';

@QueryHandler(AppHealthGetApplicationsQuery)
export class AppHealthGetApplicationsQueryHandler implements IQueryHandler<AppHealthGetApplicationsQuery>
{
    private readonly mapper: AppHealthApplicationMapper = new AppHealthApplicationMapper();

    constructor(
        private readonly getApplicationsService: AppHealthGetApplicationsService,
    ) {}

    async execute(query: AppHealthGetApplicationsQuery): Promise<AppHealthApplicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
