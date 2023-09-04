import { AppHealthAddCustomersContextEvent, AppHealthICustomerRepository } from '@app/app-health/customer';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteCustomersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const customers = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (customers.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddCustomersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const customersRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddCustomersContextEvent(customers),
        );

        customersRegistered.deleted(); // apply event to model events
        customersRegistered.commit(); // commit all events of model
    }
}
