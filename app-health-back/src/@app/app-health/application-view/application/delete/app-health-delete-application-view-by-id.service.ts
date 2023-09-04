import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view';
import { AppHealthApplicationViewId } from '@app/app-health/application-view/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationViewByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        id: AppHealthApplicationViewId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationView = await this.repository
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
                applicationView.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationViewRegister = this.publisher.mergeObjectContext(applicationView);

        applicationViewRegister.deleted(applicationView); // apply event to model events
        applicationViewRegister.commit(); // commit all events of model
    }
}
