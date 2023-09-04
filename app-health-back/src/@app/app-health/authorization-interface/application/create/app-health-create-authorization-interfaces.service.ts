import { AppHealthAddAuthorizationInterfacesContextEvent, AppHealthAuthorizationInterface, AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface';
import {
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceUpdatedAt,
} from '@app/app-health/authorization-interface/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateAuthorizationInterfacesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        authorizationInterfaces: {
            id: AppHealthAuthorizationInterfaceId;
            name: AppHealthAuthorizationInterfaceName;
            score: AppHealthAuthorizationInterfaceScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAuthorizationInterfaces = authorizationInterfaces.map(authorizationInterface => AppHealthAuthorizationInterface.register(
            authorizationInterface.id,
            authorizationInterface.name,
            authorizationInterface.score,
            new AppHealthAuthorizationInterfaceCreatedAt({ currentTimestamp: true }),
            new AppHealthAuthorizationInterfaceUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateAuthorizationInterfaces,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddAuthorizationInterfacesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const authorizationInterfacesRegistered = this.publisher.mergeObjectContext(new AppHealthAddAuthorizationInterfacesContextEvent(aggregateAuthorizationInterfaces));

        authorizationInterfacesRegistered.created(); // apply event to model events
        authorizationInterfacesRegistered.commit(); // commit all events of model
    }
}
