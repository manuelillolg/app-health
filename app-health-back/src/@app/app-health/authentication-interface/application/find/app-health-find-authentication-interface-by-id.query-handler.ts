import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthenticationInterfaceResponse } from '../../domain/app-health-authentication-interface.response';
import { AppHealthAuthenticationInterfaceMapper } from '../../domain/app-health-authentication-interface.mapper';
import { AppHealthAuthenticationInterfaceId } from '../../domain/value-objects';
import { AppHealthFindAuthenticationInterfaceByIdQuery } from './app-health-find-authentication-interface-by-id.query';
import { AppHealthFindAuthenticationInterfaceByIdService } from './app-health-find-authentication-interface-by-id.service';

@QueryHandler(AppHealthFindAuthenticationInterfaceByIdQuery)
export class AppHealthFindAuthenticationInterfaceByIdQueryHandler implements IQueryHandler<AppHealthFindAuthenticationInterfaceByIdQuery>
{
    private readonly mapper: AppHealthAuthenticationInterfaceMapper = new AppHealthAuthenticationInterfaceMapper();

    constructor(
        private readonly findAuthenticationInterfaceByIdService: AppHealthFindAuthenticationInterfaceByIdService,
    ) {}

    async execute(query: AppHealthFindAuthenticationInterfaceByIdQuery): Promise<AppHealthAuthenticationInterfaceResponse>
    {
        const authenticationInterface = await this.findAuthenticationInterfaceByIdService.main(
            new AppHealthAuthenticationInterfaceId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(authenticationInterface);
    }
}
