import { AppHealthCustomer, AppHealthICustomerRepository } from '@app/app-health/customer';
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
export class AppHealthCreateCustomerService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthCustomerId;
            name: AppHealthCustomerName;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const customer = AppHealthCustomer.register(
            payload.id,
            payload.name,
            new AppHealthCustomerCreatedAt({ currentTimestamp: true }),
            new AppHealthCustomerUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            customer,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const customerRegister = this.publisher.mergeObjectContext(
            customer,
        );

        customerRegister.created(customer); // apply event to model events
        customerRegister.commit(); // commit all events of model
    }
}
