import { AppHealthAddApplicationAuthorizationsContextEvent, AppHealthApplicationAuthorization, AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
import {
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationUpdatedAt,
} from '@app/app-health/application-authorization/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationAuthorizationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        applicationAuthorizations: {
            id: AppHealthApplicationAuthorizationId;
            applicationId: AppHealthApplicationAuthorizationApplicationId;
            authorizationInterfaceId: AppHealthApplicationAuthorizationAuthorizationInterfaceId;
            totalUsers: AppHealthApplicationAuthorizationTotalUsers;
            score: AppHealthApplicationAuthorizationScore;
            applicationInfrastructureServiceId: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationAuthorizations = applicationAuthorizations.map(applicationAuthorization => AppHealthApplicationAuthorization.register(
            applicationAuthorization.id,
            applicationAuthorization.applicationId,
            applicationAuthorization.authorizationInterfaceId,
            applicationAuthorization.totalUsers,
            applicationAuthorization.score,
            applicationAuthorization.applicationInfrastructureServiceId,
            new AppHealthApplicationAuthorizationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationAuthorizationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationAuthorizations,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationAuthorizationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationAuthorizationsRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationAuthorizationsContextEvent(aggregateApplicationAuthorizations));

        applicationAuthorizationsRegistered.created(); // apply event to model events
        applicationAuthorizationsRegistered.commit(); // commit all events of model
    }
}
