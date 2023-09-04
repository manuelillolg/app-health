import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthAuthorizationInterface } from './app-health-authorization-interface.aggregate';
import { AppHealthAuthorizationInterfaceResponse } from './app-health-authorization-interface.response';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from './value-objects';

export class AppHealthAuthorizationInterfaceMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param authorizationInterface
     */
    mapModelToAggregate(authorizationInterface: LiteralObject, cQMetadata?: CQMetadata): AppHealthAuthorizationInterface
    {
        if (!authorizationInterface) return;

        return this.makeAggregate(authorizationInterface, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param authorizationInterfaces
     */
    mapModelsToAggregates(authorizationInterfaces: LiteralObject[], cQMetadata?: CQMetadata): AppHealthAuthorizationInterface[]
    {
        if (!Array.isArray(authorizationInterfaces)) return;

        return authorizationInterfaces.map(authorizationInterface => this.makeAggregate(authorizationInterface, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param authorizationInterface
     */
    mapAggregateToResponse(authorizationInterface: AppHealthAuthorizationInterface): AppHealthAuthorizationInterfaceResponse
    {
        return this.makeResponse(authorizationInterface);
    }

    /**
     * Map array of aggregates to array responses
     * @param authorizationInterfaces
     */
    mapAggregatesToResponses(authorizationInterfaces: AppHealthAuthorizationInterface[]): AppHealthAuthorizationInterfaceResponse[]
    {
        if (!Array.isArray(authorizationInterfaces)) return;

        return authorizationInterfaces.map(authorizationInterface => this.makeResponse(authorizationInterface));
    }

    private makeAggregate(authorizationInterface: LiteralObject, cQMetadata?: CQMetadata): AppHealthAuthorizationInterface
    {
        return AppHealthAuthorizationInterface.register(
            new AppHealthAuthorizationInterfaceId(authorizationInterface.id, { undefinable: true }),
            new AppHealthAuthorizationInterfaceName(authorizationInterface.name, { undefinable: true }),
            new AppHealthAuthorizationInterfaceScore(authorizationInterface.score, { undefinable: true }),
            new AppHealthAuthorizationInterfaceCreatedAt(authorizationInterface.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthAuthorizationInterfaceUpdatedAt(authorizationInterface.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthAuthorizationInterfaceDeletedAt(authorizationInterface.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(authorizationInterface: AppHealthAuthorizationInterface): AppHealthAuthorizationInterfaceResponse
    {
        if (!authorizationInterface) return;

        return new AppHealthAuthorizationInterfaceResponse(
            authorizationInterface.id.value,
            authorizationInterface.name.value,
            authorizationInterface.score.value,
            authorizationInterface.createdAt.value,
            authorizationInterface.updatedAt.value,
            authorizationInterface.deletedAt.value,
        );
    }
}
