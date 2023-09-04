import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthorizationResponse } from '../../domain/app-health-application-authorization.response';
import { AppHealthApplicationAuthorizationMapper } from '../../domain/app-health-application-authorization.mapper';
import { AppHealthRawSQLApplicationAuthorizationsQuery } from './app-health-raw-sql-application-authorizations.query';
import { AppHealthRawSQLApplicationAuthorizationsService } from './app-health-raw-sql-application-authorizations.service';

@QueryHandler(AppHealthRawSQLApplicationAuthorizationsQuery)
export class AppHealthRawSQLApplicationAuthorizationsQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationAuthorizationsQuery>
{
    private readonly mapper: AppHealthApplicationAuthorizationMapper = new AppHealthApplicationAuthorizationMapper();

    constructor(
        private readonly rawSQLApplicationAuthorizationsService: AppHealthRawSQLApplicationAuthorizationsService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationAuthorizationsQuery): Promise<AppHealthApplicationAuthorizationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationAuthorizationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
