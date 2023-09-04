import { AppHealthIApplicationApiRepository } from '@app/app-health/application-api';
import { AppHealthApplicationApiId } from '@app/app-health/application-api/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationApiByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        id: AppHealthApplicationApiId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationApi = await this.repository
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
                applicationApi.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationApiRegister = this.publisher.mergeObjectContext(applicationApi);

        applicationApiRegister.deleted(applicationApi); // apply event to model events
        applicationApiRegister.commit(); // commit all events of model
    }
}
