import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthenticationInterfaceResponse } from '../../domain/app-health-authentication-interface.response';
import { AppHealthAuthenticationInterfaceMapper } from '../../domain/app-health-authentication-interface.mapper';
import { AppHealthFindAuthenticationInterfaceQuery } from './app-health-find-authentication-interface.query';
import { AppHealthFindAuthenticationInterfaceService } from './app-health-find-authentication-interface.service';

@QueryHandler(AppHealthFindAuthenticationInterfaceQuery)
export class AppHealthFindAuthenticationInterfaceQueryHandler implements IQueryHandler<AppHealthFindAuthenticationInterfaceQuery>
{
    private readonly mapper: AppHealthAuthenticationInterfaceMapper = new AppHealthAuthenticationInterfaceMapper();

    constructor(
        private readonly findAuthenticationInterfaceService: AppHealthFindAuthenticationInterfaceService,
    ) {}

    async execute(query: AppHealthFindAuthenticationInterfaceQuery): Promise<AppHealthAuthenticationInterfaceResponse>
    {
        const authenticationInterface = await this.findAuthenticationInterfaceService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(authenticationInterface);
    }
}
