import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
import { AppHealthApiInterfaceTypeId } from '@app/app-health/api-interface-type/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApiInterfaceTypeByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        id: AppHealthApiInterfaceTypeId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const apiInterfaceType = await this.repository
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
                apiInterfaceType.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const apiInterfaceTypeRegister = this.publisher.mergeObjectContext(apiInterfaceType);

        apiInterfaceTypeRegister.deleted(apiInterfaceType); // apply event to model events
        apiInterfaceTypeRegister.commit(); // commit all events of model
    }
}
