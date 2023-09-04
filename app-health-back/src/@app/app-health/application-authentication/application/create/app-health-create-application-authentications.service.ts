import { AppHealthAddApplicationAuthenticationsContextEvent, AppHealthApplicationAuthentication, AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
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
export class AppHealthCreateApplicationAuthenticationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        applicationAuthentications: {
            id: AppHealthApplicationAuthenticationId;
            applicationId: AppHealthApplicationAuthenticationApplicationId;
            authenticationInterfaceId: AppHealthApplicationAuthenticationAuthenticationInterfaceId;
            totalUsers: AppHealthApplicationAuthenticationTotalUsers;
            score: AppHealthApplicationAuthenticationScore;
            applicationInfrastructureServiceId: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationAuthentications = applicationAuthentications.map(applicationAuthentication => AppHealthApplicationAuthentication.register(
            applicationAuthentication.id,
            applicationAuthentication.applicationId,
            applicationAuthentication.authenticationInterfaceId,
            applicationAuthentication.totalUsers,
            applicationAuthentication.score,
            applicationAuthentication.applicationInfrastructureServiceId,
            new AppHealthApplicationAuthenticationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationAuthenticationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationAuthentications,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationAuthenticationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationAuthenticationsRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationAuthenticationsContextEvent(aggregateApplicationAuthentications));

        applicationAuthenticationsRegistered.created(); // apply event to model events
        applicationAuthenticationsRegistered.commit(); // commit all events of model
    }
}
