import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthApiInterfaceTypeResponse } from '../../domain/app-health-api-interface-type.response';
import { AppHealthApiInterfaceTypeMapper } from '../../domain/app-health-api-interface-type.mapper';
import { AppHealthApiInterfaceTypeId } from '../../domain/value-objects';
import { AppHealthFindApiInterfaceTypeByIdQuery } from './app-health-find-api-interface-type-by-id.query';
import { AppHealthFindApiInterfaceTypeByIdService } from './app-health-find-api-interface-type-by-id.service';

@QueryHandler(AppHealthFindApiInterfaceTypeByIdQuery)
export class AppHealthFindApiInterfaceTypeByIdQueryHandler implements IQueryHandler<AppHealthFindApiInterfaceTypeByIdQuery>
{
    private readonly mapper: AppHealthApiInterfaceTypeMapper = new AppHealthApiInterfaceTypeMapper();

    constructor(
        private readonly findApiInterfaceTypeByIdService: AppHealthFindApiInterfaceTypeByIdService,
    ) {}

    async execute(query: AppHealthFindApiInterfaceTypeByIdQuery): Promise<AppHealthApiInterfaceTypeResponse>
    {
        const apiInterfaceType = await this.findApiInterfaceTypeByIdService.main(
            new AppHealthApiInterfaceTypeId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(apiInterfaceType);
    }
}
