import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationAuthorization } from './app-health-application-authorization.aggregate';
import { AppHealthApplicationAuthorizationResponse } from './app-health-application-authorization.response';
import {
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationUpdatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';
import { AppHealthAuthorizationInterfaceMapper } from '@app/app-health/authorization-interface';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationAuthorizationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationAuthorization
     */
    mapModelToAggregate(applicationAuthorization: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationAuthorization
    {
        if (!applicationAuthorization) return;

        return this.makeAggregate(applicationAuthorization, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationAuthorizations
     */
    mapModelsToAggregates(applicationAuthorizations: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationAuthorization[]
    {
        if (!Array.isArray(applicationAuthorizations)) return;

        return applicationAuthorizations.map(applicationAuthorization => this.makeAggregate(applicationAuthorization, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationAuthorization
     */
    mapAggregateToResponse(applicationAuthorization: AppHealthApplicationAuthorization): AppHealthApplicationAuthorizationResponse
    {
        return this.makeResponse(applicationAuthorization);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationAuthorizations
     */
    mapAggregatesToResponses(applicationAuthorizations: AppHealthApplicationAuthorization[]): AppHealthApplicationAuthorizationResponse[]
    {
        if (!Array.isArray(applicationAuthorizations)) return;

        return applicationAuthorizations.map(applicationAuthorization => this.makeResponse(applicationAuthorization));
    }

    private makeAggregate(applicationAuthorization: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationAuthorization
    {
        return AppHealthApplicationAuthorization.register(
            new AppHealthApplicationAuthorizationId(applicationAuthorization.id, { undefinable: true }),
            new AppHealthApplicationAuthorizationApplicationId(applicationAuthorization.applicationId, { undefinable: true }),
            new AppHealthApplicationAuthorizationAuthorizationInterfaceId(applicationAuthorization.authorizationInterfaceId, { undefinable: true }),
            new AppHealthApplicationAuthorizationTotalUsers(applicationAuthorization.totalUsers, { undefinable: true }),
            new AppHealthApplicationAuthorizationScore(applicationAuthorization.score, { undefinable: true }),
            new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(applicationAuthorization.applicationInfrastructureServiceId, { undefinable: true }),
            new AppHealthApplicationAuthorizationCreatedAt(applicationAuthorization.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationAuthorizationUpdatedAt(applicationAuthorization.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationAuthorizationDeletedAt(applicationAuthorization.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationAuthorization.application, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthAuthorizationInterfaceMapper({ eagerLoading: true }).mapModelToAggregate(applicationAuthorization.authorizationInterface, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapModelToAggregate(applicationAuthorization.applicationInfrastructureService, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationAuthorization: AppHealthApplicationAuthorization): AppHealthApplicationAuthorizationResponse
    {
        if (!applicationAuthorization) return;

        return new AppHealthApplicationAuthorizationResponse(
            applicationAuthorization.id.value,
            applicationAuthorization.applicationId.value,
            applicationAuthorization.authorizationInterfaceId.value,
            applicationAuthorization.totalUsers.value,
            applicationAuthorization.score.value,
            applicationAuthorization.applicationInfrastructureServiceId.value,
            applicationAuthorization.createdAt.value,
            applicationAuthorization.updatedAt.value,
            applicationAuthorization.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationAuthorization.application) : undefined,
            this.options.eagerLoading ? new AppHealthAuthorizationInterfaceMapper({ eagerLoading: true }).mapAggregateToResponse(applicationAuthorization.authorizationInterface) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapAggregateToResponse(applicationAuthorization.applicationInfrastructureService) : undefined,
        );
    }
}
