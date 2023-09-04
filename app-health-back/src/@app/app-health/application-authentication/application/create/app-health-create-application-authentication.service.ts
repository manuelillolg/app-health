import { AppHealthApplicationAuthentication, AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
import {
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationUpdatedAt,
} from '@app/app-health/application-authentication/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationAuthenticationService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationAuthenticationId;
            applicationId: AppHealthApplicationAuthenticationApplicationId;
            authenticationInterfaceId: AppHealthApplicationAuthenticationAuthenticationInterfaceId;
            totalUsers: AppHealthApplicationAuthenticationTotalUsers;
            score: AppHealthApplicationAuthenticationScore;
            applicationInfrastructureServiceId: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationAuthentication = AppHealthApplicationAuthentication.register(
            payload.id,
            payload.applicationId,
            payload.authenticationInterfaceId,
            payload.totalUsers,
            payload.score,
            payload.applicationInfrastructureServiceId,
            new AppHealthApplicationAuthenticationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationAuthenticationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            applicationAuthentication,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationAuthenticationRegister = this.publisher.mergeObjectContext(
            applicationAuthentication,
        );

        applicationAuthenticationRegister.created(applicationAuthentication); // apply event to model events
        applicationAuthenticationRegister.commit(); // commit all events of model
    }
}
