import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';
import { AppHealthAddCustomersContextEvent } from '../events/app-health-add-customers-context.event';

@Injectable()
export class AppHealthUpdateCustomersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthCustomerId;
            name?: AppHealthCustomerName;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const customer = AppHealthCustomer.register(
            payload.id,
            payload.name,
            null, // createdAt
            new AppHealthCustomerUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            customer,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const customers = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const customersRegister = this.publisher.mergeObjectContext(
            new AppHealthAddCustomersContextEvent(customers),
        );

        customersRegister.updated(); // apply event to model events
        customersRegister.commit(); // commit all events of model
    }
}
