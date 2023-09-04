import { AppHealthAuthenticationInterface, AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface';
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
export class AppHealthCreateAuthenticationInterfaceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthAuthenticationInterfaceId;
            name: AppHealthAuthenticationInterfaceName;
            score: AppHealthAuthenticationInterfaceScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const authenticationInterface = AppHealthAuthenticationInterface.register(
            payload.id,
            payload.name,
            payload.score,
            new AppHealthAuthenticationInterfaceCreatedAt({ currentTimestamp: true }),
            new AppHealthAuthenticationInterfaceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            authenticationInterface,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const authenticationInterfaceRegister = this.publisher.mergeObjectContext(
            authenticationInterface,
        );

        authenticationInterfaceRegister.created(authenticationInterface); // apply event to model events
        authenticationInterfaceRegister.commit(); // commit all events of model
    }
}
