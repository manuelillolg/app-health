import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthenticationResponse } from '../../domain/app-health-application-authentication.response';
import { AppHealthApplicationAuthenticationMapper } from '../../domain/app-health-application-authentication.mapper';
import { AppHealthApplicationAuthenticationId } from '../../domain/value-objects';
import { AppHealthFindApplicationAuthenticationByIdQuery } from './app-health-find-application-authentication-by-id.query';
import { AppHealthFindApplicationAuthenticationByIdService } from './app-health-find-application-authentication-by-id.service';

@QueryHandler(AppHealthFindApplicationAuthenticationByIdQuery)
export class AppHealthFindApplicationAuthenticationByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationAuthenticationByIdQuery>
{
    private readonly mapper: AppHealthApplicationAuthenticationMapper = new AppHealthApplicationAuthenticationMapper();

    constructor(
        private readonly findApplicationAuthenticationByIdService: AppHealthFindApplicationAuthenticationByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationAuthenticationByIdQuery): Promise<AppHealthApplicationAuthenticationResponse>
    {
        const applicationAuthentication = await this.findApplicationAuthenticationByIdService.main(
            new AppHealthApplicationAuthenticationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationAuthentication);
    }
}
