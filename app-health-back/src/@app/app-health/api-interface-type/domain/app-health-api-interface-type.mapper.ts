import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApiInterfaceType } from './app-health-api-interface-type.aggregate';
import { AppHealthApiInterfaceTypeResponse } from './app-health-api-interface-type.response';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from './value-objects';

export class AppHealthApiInterfaceTypeMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param apiInterfaceType
     */
    mapModelToAggregate(apiInterfaceType: LiteralObject, cQMetadata?: CQMetadata): AppHealthApiInterfaceType
    {
        if (!apiInterfaceType) return;

        return this.makeAggregate(apiInterfaceType, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param apiInterfaceTypes
     */
    mapModelsToAggregates(apiInterfaceTypes: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApiInterfaceType[]
    {
        if (!Array.isArray(apiInterfaceTypes)) return;

        return apiInterfaceTypes.map(apiInterfaceType => this.makeAggregate(apiInterfaceType, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param apiInterfaceType
     */
    mapAggregateToResponse(apiInterfaceType: AppHealthApiInterfaceType): AppHealthApiInterfaceTypeResponse
    {
        return this.makeResponse(apiInterfaceType);
    }

    /**
     * Map array of aggregates to array responses
     * @param apiInterfaceTypes
     */
    mapAggregatesToResponses(apiInterfaceTypes: AppHealthApiInterfaceType[]): AppHealthApiInterfaceTypeResponse[]
    {
        if (!Array.isArray(apiInterfaceTypes)) return;

        return apiInterfaceTypes.map(apiInterfaceType => this.makeResponse(apiInterfaceType));
    }

    private makeAggregate(apiInterfaceType: LiteralObject, cQMetadata?: CQMetadata): AppHealthApiInterfaceType
    {
        return AppHealthApiInterfaceType.register(
            new AppHealthApiInterfaceTypeId(apiInterfaceType.id, { undefinable: true }),
            new AppHealthApiInterfaceTypeName(apiInterfaceType.name, { undefinable: true }),
            new AppHealthApiInterfaceTypeScore(apiInterfaceType.score, { undefinable: true }),
            new AppHealthApiInterfaceTypeCreatedAt(apiInterfaceType.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApiInterfaceTypeUpdatedAt(apiInterfaceType.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApiInterfaceTypeDeletedAt(apiInterfaceType.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(apiInterfaceType: AppHealthApiInterfaceType): AppHealthApiInterfaceTypeResponse
    {
        if (!apiInterfaceType) return;

        return new AppHealthApiInterfaceTypeResponse(
            apiInterfaceType.id.value,
            apiInterfaceType.name.value,
            apiInterfaceType.score.value,
            apiInterfaceType.createdAt.value,
            apiInterfaceType.updatedAt.value,
            apiInterfaceType.deletedAt.value,
        );
    }
}
