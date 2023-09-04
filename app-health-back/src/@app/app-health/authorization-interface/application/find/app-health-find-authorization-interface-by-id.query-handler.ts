import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthorizationInterfaceResponse } from '../../domain/app-health-authorization-interface.response';
import { AppHealthAuthorizationInterfaceMapper } from '../../domain/app-health-authorization-interface.mapper';
import { AppHealthAuthorizationInterfaceId } from '../../domain/value-objects';
import { AppHealthFindAuthorizationInterfaceByIdQuery } from './app-health-find-authorization-interface-by-id.query';
import { AppHealthFindAuthorizationInterfaceByIdService } from './app-health-find-authorization-interface-by-id.service';

@QueryHandler(AppHealthFindAuthorizationInterfaceByIdQuery)
export class AppHealthFindAuthorizationInterfaceByIdQueryHandler implements IQueryHandler<AppHealthFindAuthorizationInterfaceByIdQuery>
{
    private readonly mapper: AppHealthAuthorizationInterfaceMapper = new AppHealthAuthorizationInterfaceMapper();

    constructor(
        private readonly findAuthorizationInterfaceByIdService: AppHealthFindAuthorizationInterfaceByIdService,
    ) {}

    async execute(query: AppHealthFindAuthorizationInterfaceByIdQuery): Promise<AppHealthAuthorizationInterfaceResponse>
    {
        const authorizationInterface = await this.findAuthorizationInterfaceByIdService.main(
            new AppHealthAuthorizationInterfaceId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(authorizationInterface);
    }
}
