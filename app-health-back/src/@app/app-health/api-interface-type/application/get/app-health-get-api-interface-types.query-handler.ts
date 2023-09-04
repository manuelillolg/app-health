import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApiInterfaceTypeResponse } from '../../domain/app-health-api-interface-type.response';
import { AppHealthApiInterfaceTypeMapper } from '../../domain/app-health-api-interface-type.mapper';
import { AppHealthGetApiInterfaceTypesQuery } from './app-health-get-api-interface-types.query';
import { AppHealthGetApiInterfaceTypesService } from './app-health-get-api-interface-types.service';

@QueryHandler(AppHealthGetApiInterfaceTypesQuery)
export class AppHealthGetApiInterfaceTypesQueryHandler implements IQueryHandler<AppHealthGetApiInterfaceTypesQuery>
{
    private readonly mapper: AppHealthApiInterfaceTypeMapper = new AppHealthApiInterfaceTypeMapper();

    constructor(
        private readonly getApiInterfaceTypesService: AppHealthGetApiInterfaceTypesService,
    ) {}

    async execute(query: AppHealthGetApiInterfaceTypesQuery): Promise<AppHealthApiInterfaceTypeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getApiInterfaceTypesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
