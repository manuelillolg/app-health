import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';
import { AppHealthAddAuthorizationInterfacesContextEvent } from '../events/app-health-add-authorization-interfaces-context.event';

@Injectable()
export class AppHealthUpdateAuthorizationInterfacesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthAuthorizationInterfaceId;
            name?: AppHealthAuthorizationInterfaceName;
            score?: AppHealthAuthorizationInterfaceScore;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const authorizationInterface = AppHealthAuthorizationInterface.register(
            payload.id,
            payload.name,
            payload.score,
            null, // createdAt
            new AppHealthAuthorizationInterfaceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            authorizationInterface,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const authorizationInterfaces = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const authorizationInterfacesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddAuthorizationInterfacesContextEvent(authorizationInterfaces),
        );

        authorizationInterfacesRegister.updated(); // apply event to model events
        authorizationInterfacesRegister.commit(); // commit all events of model
    }
}
