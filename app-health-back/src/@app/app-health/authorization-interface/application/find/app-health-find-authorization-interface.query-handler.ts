import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthorizationInterfaceResponse } from '../../domain/app-health-authorization-interface.response';
import { AppHealthAuthorizationInterfaceMapper } from '../../domain/app-health-authorization-interface.mapper';
import { AppHealthFindAuthorizationInterfaceQuery } from './app-health-find-authorization-interface.query';
import { AppHealthFindAuthorizationInterfaceService } from './app-health-find-authorization-interface.service';

@QueryHandler(AppHealthFindAuthorizationInterfaceQuery)
export class AppHealthFindAuthorizationInterfaceQueryHandler implements IQueryHandler<AppHealthFindAuthorizationInterfaceQuery>
{
    private readonly mapper: AppHealthAuthorizationInterfaceMapper = new AppHealthAuthorizationInterfaceMapper();

    constructor(
        private readonly findAuthorizationInterfaceService: AppHealthFindAuthorizationInterfaceService,
    ) {}

    async execute(query: AppHealthFindAuthorizationInterfaceQuery): Promise<AppHealthAuthorizationInterfaceResponse>
    {
        const authorizationInterface = await this.findAuthorizationInterfaceService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(authorizationInterface);
    }
}
