import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthorizationResponse } from '../../domain/app-health-application-authorization.response';
import { AppHealthApplicationAuthorizationMapper } from '../../domain/app-health-application-authorization.mapper';
import { AppHealthGetApplicationAuthorizationsQuery } from './app-health-get-application-authorizations.query';
import { AppHealthGetApplicationAuthorizationsService } from './app-health-get-application-authorizations.service';

@QueryHandler(AppHealthGetApplicationAuthorizationsQuery)
export class AppHealthGetApplicationAuthorizationsQueryHandler implements IQueryHandler<AppHealthGetApplicationAuthorizationsQuery>
{
    private readonly mapper: AppHealthApplicationAuthorizationMapper = new AppHealthApplicationAuthorizationMapper();

    constructor(
        private readonly getApplicationAuthorizationsService: AppHealthGetApplicationAuthorizationsService,
    ) {}

    async execute(query: AppHealthGetApplicationAuthorizationsQuery): Promise<AppHealthApplicationAuthorizationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationAuthorizationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
