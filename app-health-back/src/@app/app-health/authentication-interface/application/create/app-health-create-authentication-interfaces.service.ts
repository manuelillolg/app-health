import { AppHealthAddAuthenticationInterfacesContextEvent, AppHealthAuthenticationInterface, AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface';
import {
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceUpdatedAt,
} from '@app/app-health/authentication-interface/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateAuthenticationInterfacesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        authenticationInterfaces: {
            id: AppHealthAuthenticationInterfaceId;
            name: AppHealthAuthenticationInterfaceName;
            score: AppHealthAuthenticationInterfaceScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAuthenticationInterfaces = authenticationInterfaces.map(authenticationInterface => AppHealthAuthenticationInterface.register(
            authenticationInterface.id,
            authenticationInterface.name,
            authenticationInterface.score,
            new AppHealthAuthenticationInterfaceCreatedAt({ currentTimestamp: true }),
            new AppHealthAuthenticationInterfaceUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAuthenticationInterfaces,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAuthenticationInterfacesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const authenticationInterfacesRegistered = this.publisher.mergeObjectContext(new AppHealthAddAuthenticationInterfacesContextEvent(aggregateAuthenticationInterfaces));

        authenticationInterfacesRegistered.created(); // apply event to model events
        authenticationInterfacesRegistered.commit(); // commit all events of model
    }
}
