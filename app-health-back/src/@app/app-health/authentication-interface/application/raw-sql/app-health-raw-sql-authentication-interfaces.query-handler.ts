import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthenticationInterfaceResponse } from '../../domain/app-health-authentication-interface.response';
import { AppHealthAuthenticationInterfaceMapper } from '../../domain/app-health-authentication-interface.mapper';
import { AppHealthRawSQLAuthenticationInterfacesQuery } from './app-health-raw-sql-authentication-interfaces.query';
import { AppHealthRawSQLAuthenticationInterfacesService } from './app-health-raw-sql-authentication-interfaces.service';

@QueryHandler(AppHealthRawSQLAuthenticationInterfacesQuery)
export class AppHealthRawSQLAuthenticationInterfacesQueryHandler implements IQueryHandler<AppHealthRawSQLAuthenticationInterfacesQuery>
{
    private readonly mapper: AppHealthAuthenticationInterfaceMapper = new AppHealthAuthenticationInterfaceMapper();

    constructor(
        private readonly rawSQLAuthenticationInterfacesService: AppHealthRawSQLAuthenticationInterfacesService,
    ) {}

    async execute(query: AppHealthRawSQLAuthenticationInterfacesQuery): Promise<AppHealthAuthenticationInterfaceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLAuthenticationInterfacesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
