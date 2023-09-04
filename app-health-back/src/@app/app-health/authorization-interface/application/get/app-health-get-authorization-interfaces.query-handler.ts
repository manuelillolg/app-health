import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthorizationInterfaceResponse } from '../../domain/app-health-authorization-interface.response';
import { AppHealthAuthorizationInterfaceMapper } from '../../domain/app-health-authorization-interface.mapper';
import { AppHealthGetAuthorizationInterfacesQuery } from './app-health-get-authorization-interfaces.query';
import { AppHealthGetAuthorizationInterfacesService } from './app-health-get-authorization-interfaces.service';

@QueryHandler(AppHealthGetAuthorizationInterfacesQuery)
export class AppHealthGetAuthorizationInterfacesQueryHandler implements IQueryHandler<AppHealthGetAuthorizationInterfacesQuery>
{
    private readonly mapper: AppHealthAuthorizationInterfaceMapper = new AppHealthAuthorizationInterfaceMapper();

    constructor(
        private readonly getAuthorizationInterfacesService: AppHealthGetAuthorizationInterfacesService,
    ) {}

    async execute(query: AppHealthGetAuthorizationInterfacesQuery): Promise<AppHealthAuthorizationInterfaceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAuthorizationInterfacesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
