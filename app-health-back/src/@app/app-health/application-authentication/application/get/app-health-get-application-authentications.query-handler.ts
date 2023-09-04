import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthenticationResponse } from '../../domain/app-health-application-authentication.response';
import { AppHealthApplicationAuthenticationMapper } from '../../domain/app-health-application-authentication.mapper';
import { AppHealthGetApplicationAuthenticationsQuery } from './app-health-get-application-authentications.query';
import { AppHealthGetApplicationAuthenticationsService } from './app-health-get-application-authentications.service';

@QueryHandler(AppHealthGetApplicationAuthenticationsQuery)
export class AppHealthGetApplicationAuthenticationsQueryHandler implements IQueryHandler<AppHealthGetApplicationAuthenticationsQuery>
{
    private readonly mapper: AppHealthApplicationAuthenticationMapper = new AppHealthApplicationAuthenticationMapper();

    constructor(
        private readonly getApplicationAuthenticationsService: AppHealthGetApplicationAuthenticationsService,
    ) {}

    async execute(query: AppHealthGetApplicationAuthenticationsQuery): Promise<AppHealthApplicationAuthenticationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApplicationAuthenticationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
