import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthenticationResponse } from '../../domain/app-health-application-authentication.response';
import { AppHealthApplicationAuthenticationMapper } from '../../domain/app-health-application-authentication.mapper';
import { AppHealthRawSQLApplicationAuthenticationsQuery } from './app-health-raw-sql-application-authentications.query';
import { AppHealthRawSQLApplicationAuthenticationsService } from './app-health-raw-sql-application-authentications.service';

@QueryHandler(AppHealthRawSQLApplicationAuthenticationsQuery)
export class AppHealthRawSQLApplicationAuthenticationsQueryHandler implements IQueryHandler<AppHealthRawSQLApplicationAuthenticationsQuery>
{
    private readonly mapper: AppHealthApplicationAuthenticationMapper = new AppHealthApplicationAuthenticationMapper();

    constructor(
        private readonly rawSQLApplicationAuthenticationsService: AppHealthRawSQLApplicationAuthenticationsService,
    ) {}

    async execute(query: AppHealthRawSQLApplicationAuthenticationsQuery): Promise<AppHealthApplicationAuthenticationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApplicationAuthenticationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
