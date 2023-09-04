import { AppHealthAddApiInterfaceTypesContextEvent, AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApiInterfaceTypesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const apiInterfaceTypes = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (apiInterfaceTypes.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApiInterfaceTypesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const apiInterfaceTypesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApiInterfaceTypesContextEvent(apiInterfaceTypes),
        );

        apiInterfaceTypesRegistered.deleted(); // apply event to model events
        apiInterfaceTypesRegistered.commit(); // commit all events of model
    }
}
