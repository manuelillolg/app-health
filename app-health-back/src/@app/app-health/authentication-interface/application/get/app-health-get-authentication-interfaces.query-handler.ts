import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthAuthenticationInterfaceResponse } from '../../domain/app-health-authentication-interface.response';
import { AppHealthAuthenticationInterfaceMapper } from '../../domain/app-health-authentication-interface.mapper';
import { AppHealthGetAuthenticationInterfacesQuery } from './app-health-get-authentication-interfaces.query';
import { AppHealthGetAuthenticationInterfacesService } from './app-health-get-authentication-interfaces.service';

@QueryHandler(AppHealthGetAuthenticationInterfacesQuery)
export class AppHealthGetAuthenticationInterfacesQueryHandler implements IQueryHandler<AppHealthGetAuthenticationInterfacesQuery>
{
    private readonly mapper: AppHealthAuthenticationInterfaceMapper = new AppHealthAuthenticationInterfaceMapper();

    constructor(
        private readonly getAuthenticationInterfacesService: AppHealthGetAuthenticationInterfacesService,
    ) {}

    async execute(query: AppHealthGetAuthenticationInterfacesQuery): Promise<AppHealthAuthenticationInterfaceResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAuthenticationInterfacesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
