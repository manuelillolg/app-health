import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterface } from '../../domain/app-health-authentication-interface.aggregate';
import { AppHealthAddAuthenticationInterfacesContextEvent } from '../events/app-health-add-authentication-interfaces-context.event';

@Injectable()
export class AppHealthUpdateAuthenticationInterfacesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthAuthenticationInterfaceId;
            name?: AppHealthAuthenticationInterfaceName;
            score?: AppHealthAuthenticationInterfaceScore;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const authenticationInterface = AppHealthAuthenticationInterface.register(
            payload.id,
            payload.name,
            payload.score,
            null, // createdAt
            new AppHealthAuthenticationInterfaceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            authenticationInterface,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const authenticationInterfaces = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const authenticationInterfacesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddAuthenticationInterfacesContextEvent(authenticationInterfaces),
        );

        authenticationInterfacesRegister.updated(); // apply event to model events
        authenticationInterfacesRegister.commit(); // commit all events of model
    }
}
