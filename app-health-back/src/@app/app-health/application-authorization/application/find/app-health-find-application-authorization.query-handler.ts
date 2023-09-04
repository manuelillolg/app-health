import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthorizationResponse } from '../../domain/app-health-application-authorization.response';
import { AppHealthApplicationAuthorizationMapper } from '../../domain/app-health-application-authorization.mapper';
import { AppHealthFindApplicationAuthorizationQuery } from './app-health-find-application-authorization.query';
import { AppHealthFindApplicationAuthorizationService } from './app-health-find-application-authorization.service';

@QueryHandler(AppHealthFindApplicationAuthorizationQuery)
export class AppHealthFindApplicationAuthorizationQueryHandler implements IQueryHandler<AppHealthFindApplicationAuthorizationQuery>
{
    private readonly mapper: AppHealthApplicationAuthorizationMapper = new AppHealthApplicationAuthorizationMapper();

    constructor(
        private readonly findApplicationAuthorizationService: AppHealthFindApplicationAuthorizationService,
    ) {}

    async execute(query: AppHealthFindApplicationAuthorizationQuery): Promise<AppHealthApplicationAuthorizationResponse>
    {
        const applicationAuthorization = await this.findApplicationAuthorizationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationAuthorization);
    }
}
