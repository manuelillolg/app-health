import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthAuthenticationInterface } from './app-health-authentication-interface.aggregate';
import { AppHealthAuthenticationInterfaceResponse } from './app-health-authentication-interface.response';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from './value-objects';

export class AppHealthAuthenticationInterfaceMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param authenticationInterface
     */
    mapModelToAggregate(authenticationInterface: LiteralObject, cQMetadata?: CQMetadata): AppHealthAuthenticationInterface
    {
        if (!authenticationInterface) return;

        return this.makeAggregate(authenticationInterface, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param authenticationInterfaces
     */
    mapModelsToAggregates(authenticationInterfaces: LiteralObject[], cQMetadata?: CQMetadata): AppHealthAuthenticationInterface[]
    {
        if (!Array.isArray(authenticationInterfaces)) return;

        return authenticationInterfaces.map(authenticationInterface => this.makeAggregate(authenticationInterface, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param authenticationInterface
     */
    mapAggregateToResponse(authenticationInterface: AppHealthAuthenticationInterface): AppHealthAuthenticationInterfaceResponse
    {
        return this.makeResponse(authenticationInterface);
    }

    /**
     * Map array of aggregates to array responses
     * @param authenticationInterfaces
     */
    mapAggregatesToResponses(authenticationInterfaces: AppHealthAuthenticationInterface[]): AppHealthAuthenticationInterfaceResponse[]
    {
        if (!Array.isArray(authenticationInterfaces)) return;

        return authenticationInterfaces.map(authenticationInterface => this.makeResponse(authenticationInterface));
    }

    private makeAggregate(authenticationInterface: LiteralObject, cQMetadata?: CQMetadata): AppHealthAuthenticationInterface
    {
        return AppHealthAuthenticationInterface.register(
            new AppHealthAuthenticationInterfaceId(authenticationInterface.id, { undefinable: true }),
            new AppHealthAuthenticationInterfaceName(authenticationInterface.name, { undefinable: true }),
            new AppHealthAuthenticationInterfaceScore(authenticationInterface.score, { undefinable: true }),
            new AppHealthAuthenticationInterfaceCreatedAt(authenticationInterface.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthAuthenticationInterfaceUpdatedAt(authenticationInterface.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthAuthenticationInterfaceDeletedAt(authenticationInterface.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(authenticationInterface: AppHealthAuthenticationInterface): AppHealthAuthenticationInterfaceResponse
    {
        if (!authenticationInterface) return;

        return new AppHealthAuthenticationInterfaceResponse(
            authenticationInterface.id.value,
            authenticationInterface.name.value,
            authenticationInterface.score.value,
            authenticationInterface.createdAt.value,
            authenticationInterface.updatedAt.value,
            authenticationInterface.deletedAt.value,
        );
    }
}
