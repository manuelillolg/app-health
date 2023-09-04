import { AppHealthAuthorizationInterface, AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface';
import {
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceUpdatedAt,
} from '@app/app-health/authorization-interface/domain/value-objects';
import { CQMetadata, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpsertAuthorizationInterfaceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthAuthorizationInterfaceId;
            name: AppHealthAuthorizationInterfaceName;
            score: AppHealthAuthorizationInterfaceScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // upsert aggregate with factory pattern
        const authorizationInterface = AppHealthAuthorizationInterface.register(
            payload.id,
            payload.name,
            payload.score,
            new AppHealthAuthorizationInterfaceCreatedAt({ currentTimestamp: true }),
            new AppHealthAuthorizationInterfaceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository
            .upsert(
                authorizationInterface,
                {
                    upsertOptions: cQMetadata?.repositoryOptions,
                },
            );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const authorizationInterfaceRegister = this.publisher.mergeObjectContext(
            authorizationInterface,
        );

        authorizationInterfaceRegister.created(authorizationInterface); // apply event to model events
        authorizationInterfaceRegister.commit(); // commit all events of model
    }
}
