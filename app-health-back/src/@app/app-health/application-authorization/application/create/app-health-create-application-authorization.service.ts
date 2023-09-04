import { AppHealthApplicationAuthorization, AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
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
export class AppHealthCreateApplicationAuthorizationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationAuthorizationId;
            applicationId: AppHealthApplicationAuthorizationApplicationId;
            authorizationInterfaceId: AppHealthApplicationAuthorizationAuthorizationInterfaceId;
            totalUsers: AppHealthApplicationAuthorizationTotalUsers;
            score: AppHealthApplicationAuthorizationScore;
            applicationInfrastructureServiceId: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationAuthorization = AppHealthApplicationAuthorization.register(
            payload.id,
            payload.applicationId,
            payload.authorizationInterfaceId,
            payload.totalUsers,
            payload.score,
            payload.applicationInfrastructureServiceId,
            new AppHealthApplicationAuthorizationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationAuthorizationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            applicationAuthorization,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationAuthorizationRegister = this.publisher.mergeObjectContext(
            applicationAuthorization,
        );

        applicationAuthorizationRegister.created(applicationAuthorization); // apply event to model events
        applicationAuthorizationRegister.commit(); // commit all events of model
    }
}
