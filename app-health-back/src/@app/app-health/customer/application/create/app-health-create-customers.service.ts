import { AppHealthAddCustomersContextEvent, AppHealthCustomer, AppHealthICustomerRepository } from '@app/app-health/customer';
import {
    AppHealthCustomerCreatedAt,
    AppHealthCustomerDeletedAt,
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerUpdatedAt,
} from '@app/app-health/customer/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateCustomersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        customers: {
            id: AppHealthCustomerId;
            name: AppHealthCustomerName;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateCustomers = customers.map(customer => AppHealthCustomer.register(
            customer.id,
            customer.name,
            new AppHealthCustomerCreatedAt({ currentTimestamp: true }),
            new AppHealthCustomerUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateCustomers,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddCustomersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const customersRegistered = this.publisher.mergeObjectContext(new AppHealthAddCustomersContextEvent(aggregateCustomers));

        customersRegistered.created(); // apply event to model events
        customersRegistered.commit(); // commit all events of model
    }
}
