import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthorizationInterfaceResponse } from '../../domain/app-health-authorization-interface.response';
import { AppHealthAuthorizationInterfaceMapper } from '../../domain/app-health-authorization-interface.mapper';
import { AppHealthRawSQLAuthorizationInterfacesQuery } from './app-health-raw-sql-authorization-interfaces.query';
import { AppHealthRawSQLAuthorizationInterfacesService } from './app-health-raw-sql-authorization-interfaces.service';

@QueryHandler(AppHealthRawSQLAuthorizationInterfacesQuery)
export class AppHealthRawSQLAuthorizationInterfacesQueryHandler implements IQueryHandler<AppHealthRawSQLAuthorizationInterfacesQuery>
{
    private readonly mapper: AppHealthAuthorizationInterfaceMapper = new AppHealthAuthorizationInterfaceMapper();

    constructor(
        private readonly rawSQLAuthorizationInterfacesService: AppHealthRawSQLAuthorizationInterfacesService,
    ) {}

    async execute(query: AppHealthRawSQLAuthorizationInterfacesQuery): Promise<AppHealthAuthorizationInterfaceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAuthorizationInterfacesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
