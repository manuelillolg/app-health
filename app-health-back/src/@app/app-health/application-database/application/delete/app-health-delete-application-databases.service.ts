import { AppHealthAddApplicationDatabasesContextEvent, AppHealthIApplicationDatabaseRepository } from '@app/app-health/application-database';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationDatabasesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationDatabaseRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applicationDatabases = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applicationDatabases.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationDatabasesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationDatabasesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationDatabasesContextEvent(applicationDatabases),
        );

        applicationDatabasesRegistered.deleted(); // apply event to model events
        applicationDatabasesRegistered.commit(); // commit all events of model
    }
}
