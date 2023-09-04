import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface';
import { AppHealthAuthenticationInterfaceId } from '@app/app-health/authentication-interface/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteAuthenticationInterfaceByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        id: AppHealthAuthenticationInterfaceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const authenticationInterface = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                authenticationInterface.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const authenticationInterfaceRegister = this.publisher.mergeObjectContext(authenticationInterface);

        authenticationInterfaceRegister.deleted(authenticationInterface); // apply event to model events
        authenticationInterfaceRegister.commit(); // commit all events of model
    }
}
