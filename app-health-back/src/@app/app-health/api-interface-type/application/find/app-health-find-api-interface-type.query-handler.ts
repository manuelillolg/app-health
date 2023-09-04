import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApiInterfaceTypeResponse } from '../../domain/app-health-api-interface-type.response';
import { AppHealthApiInterfaceTypeMapper } from '../../domain/app-health-api-interface-type.mapper';
import { AppHealthFindApiInterfaceTypeQuery } from './app-health-find-api-interface-type.query';
import { AppHealthFindApiInterfaceTypeService } from './app-health-find-api-interface-type.service';

@QueryHandler(AppHealthFindApiInterfaceTypeQuery)
export class AppHealthFindApiInterfaceTypeQueryHandler implements IQueryHandler<AppHealthFindApiInterfaceTypeQuery>
{
    private readonly mapper: AppHealthApiInterfaceTypeMapper = new AppHealthApiInterfaceTypeMapper();

    constructor(
        private readonly findApiInterfaceTypeService: AppHealthFindApiInterfaceTypeService,
    ) {}

    async execute(query: AppHealthFindApiInterfaceTypeQuery): Promise<AppHealthApiInterfaceTypeResponse>
    {
        const apiInterfaceType = await this.findApiInterfaceTypeService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(apiInterfaceType);
    }
}
