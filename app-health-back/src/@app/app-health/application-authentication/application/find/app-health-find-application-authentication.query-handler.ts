import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthenticationResponse } from '../../domain/app-health-application-authentication.response';
import { AppHealthApplicationAuthenticationMapper } from '../../domain/app-health-application-authentication.mapper';
import { AppHealthFindApplicationAuthenticationQuery } from './app-health-find-application-authentication.query';
import { AppHealthFindApplicationAuthenticationService } from './app-health-find-application-authentication.service';

@QueryHandler(AppHealthFindApplicationAuthenticationQuery)
export class AppHealthFindApplicationAuthenticationQueryHandler implements IQueryHandler<AppHealthFindApplicationAuthenticationQuery>
{
    private readonly mapper: AppHealthApplicationAuthenticationMapper = new AppHealthApplicationAuthenticationMapper();

    constructor(
        private readonly findApplicationAuthenticationService: AppHealthFindApplicationAuthenticationService,
    ) {}

    async execute(query: AppHealthFindApplicationAuthenticationQuery): Promise<AppHealthApplicationAuthenticationResponse>
    {
        const applicationAuthentication = await this.findApplicationAuthenticationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationAuthentication);
    }
}
