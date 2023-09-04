import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthApplicationAuthentication } from './app-health-application-authentication.aggregate';
import { AppHealthApplicationAuthenticationResponse } from './app-health-application-authentication.response';
import {
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationUpdatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
} from './value-objects';
import { AppHealthApplicationMapper } from '@app/app-health/application';
import { AppHealthAuthenticationInterfaceMapper } from '@app/app-health/authentication-interface';
import { AppHealthApplicationInfrastructureServiceMapper } from '@app/app-health/application-infrastructure-service';

export class AppHealthApplicationAuthenticationMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param applicationAuthentication
     */
    mapModelToAggregate(applicationAuthentication: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationAuthentication
    {
        if (!applicationAuthentication) return;

        return this.makeAggregate(applicationAuthentication, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param applicationAuthentications
     */
    mapModelsToAggregates(applicationAuthentications: LiteralObject[], cQMetadata?: CQMetadata): AppHealthApplicationAuthentication[]
    {
        if (!Array.isArray(applicationAuthentications)) return;

        return applicationAuthentications.map(applicationAuthentication => this.makeAggregate(applicationAuthentication, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param applicationAuthentication
     */
    mapAggregateToResponse(applicationAuthentication: AppHealthApplicationAuthentication): AppHealthApplicationAuthenticationResponse
    {
        return this.makeResponse(applicationAuthentication);
    }

    /**
     * Map array of aggregates to array responses
     * @param applicationAuthentications
     */
    mapAggregatesToResponses(applicationAuthentications: AppHealthApplicationAuthentication[]): AppHealthApplicationAuthenticationResponse[]
    {
        if (!Array.isArray(applicationAuthentications)) return;

        return applicationAuthentications.map(applicationAuthentication => this.makeResponse(applicationAuthentication));
    }

    private makeAggregate(applicationAuthentication: LiteralObject, cQMetadata?: CQMetadata): AppHealthApplicationAuthentication
    {
        return AppHealthApplicationAuthentication.register(
            new AppHealthApplicationAuthenticationId(applicationAuthentication.id, { undefinable: true }),
            new AppHealthApplicationAuthenticationApplicationId(applicationAuthentication.applicationId, { undefinable: true }),
            new AppHealthApplicationAuthenticationAuthenticationInterfaceId(applicationAuthentication.authenticationInterfaceId, { undefinable: true }),
            new AppHealthApplicationAuthenticationTotalUsers(applicationAuthentication.totalUsers, { undefinable: true }),
            new AppHealthApplicationAuthenticationScore(applicationAuthentication.score, { undefinable: true }),
            new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(applicationAuthentication.applicationInfrastructureServiceId, { undefinable: true }),
            new AppHealthApplicationAuthenticationCreatedAt(applicationAuthentication.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationAuthenticationUpdatedAt(applicationAuthentication.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthApplicationAuthenticationDeletedAt(applicationAuthentication.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapModelToAggregate(applicationAuthentication.application, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthAuthenticationInterfaceMapper({ eagerLoading: true }).mapModelToAggregate(applicationAuthentication.authenticationInterface, cQMetadata) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapModelToAggregate(applicationAuthentication.applicationInfrastructureService, cQMetadata) : undefined,
        );
    }

    private makeResponse(applicationAuthentication: AppHealthApplicationAuthentication): AppHealthApplicationAuthenticationResponse
    {
        if (!applicationAuthentication) return;

        return new AppHealthApplicationAuthenticationResponse(
            applicationAuthentication.id.value,
            applicationAuthentication.applicationId.value,
            applicationAuthentication.authenticationInterfaceId.value,
            applicationAuthentication.totalUsers.value,
            applicationAuthentication.score.value,
            applicationAuthentication.applicationInfrastructureServiceId.value,
            applicationAuthentication.createdAt.value,
            applicationAuthentication.updatedAt.value,
            applicationAuthentication.deletedAt.value,
            this.options.eagerLoading ? new AppHealthApplicationMapper({ eagerLoading: true }).mapAggregateToResponse(applicationAuthentication.application) : undefined,
            this.options.eagerLoading ? new AppHealthAuthenticationInterfaceMapper({ eagerLoading: true }).mapAggregateToResponse(applicationAuthentication.authenticationInterface) : undefined,
            this.options.eagerLoading ? new AppHealthApplicationInfrastructureServiceMapper({ eagerLoading: true }).mapAggregateToResponse(applicationAuthentication.applicationInfrastructureService) : undefined,
        );
    }
}
