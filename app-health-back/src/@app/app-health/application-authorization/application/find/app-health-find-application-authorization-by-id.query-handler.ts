import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApplicationAuthorizationResponse } from '../../domain/app-health-application-authorization.response';
import { AppHealthApplicationAuthorizationMapper } from '../../domain/app-health-application-authorization.mapper';
import { AppHealthApplicationAuthorizationId } from '../../domain/value-objects';
import { AppHealthFindApplicationAuthorizationByIdQuery } from './app-health-find-application-authorization-by-id.query';
import { AppHealthFindApplicationAuthorizationByIdService } from './app-health-find-application-authorization-by-id.service';

@QueryHandler(AppHealthFindApplicationAuthorizationByIdQuery)
export class AppHealthFindApplicationAuthorizationByIdQueryHandler implements IQueryHandler<AppHealthFindApplicationAuthorizationByIdQuery>
{
    private readonly mapper: AppHealthApplicationAuthorizationMapper = new AppHealthApplicationAuthorizationMapper();

    constructor(
        private readonly findApplicationAuthorizationByIdService: AppHealthFindApplicationAuthorizationByIdService,
    ) {}

    async execute(query: AppHealthFindApplicationAuthorizationByIdQuery): Promise<AppHealthApplicationAuthorizationResponse>
    {
        const applicationAuthorization = await this.findApplicationAuthorizationByIdService.main(
            new AppHealthApplicationAuthorizationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(applicationAuthorization);
    }
}
