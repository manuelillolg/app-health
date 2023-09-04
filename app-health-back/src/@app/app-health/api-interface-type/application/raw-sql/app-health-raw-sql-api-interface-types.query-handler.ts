import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApiInterfaceTypeResponse } from '../../domain/app-health-api-interface-type.response';
import { AppHealthApiInterfaceTypeMapper } from '../../domain/app-health-api-interface-type.mapper';
import { AppHealthRawSQLApiInterfaceTypesQuery } from './app-health-raw-sql-api-interface-types.query';
import { AppHealthRawSQLApiInterfaceTypesService } from './app-health-raw-sql-api-interface-types.service';

@QueryHandler(AppHealthRawSQLApiInterfaceTypesQuery)
export class AppHealthRawSQLApiInterfaceTypesQueryHandler implements IQueryHandler<AppHealthRawSQLApiInterfaceTypesQuery>
{
    private readonly mapper: AppHealthApiInterfaceTypeMapper = new AppHealthApiInterfaceTypeMapper();

    constructor(
        private readonly rawSQLApiInterfaceTypesService: AppHealthRawSQLApiInterfaceTypesService,
    ) {}

    async execute(query: AppHealthRawSQLApiInterfaceTypesQuery): Promise<AppHealthApiInterfaceTypeResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLApiInterfaceTypesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
