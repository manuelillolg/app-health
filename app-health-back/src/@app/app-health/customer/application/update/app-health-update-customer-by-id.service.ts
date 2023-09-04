import { AppHealthCustomer, AppHealthICustomerRepository } from '@app/app-health/customer';
import {
    AppHealthCustomerCreatedAt,
    AppHealthCustomerDeletedAt,
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerUpdatedAt,
} from '@app/app-health/customer/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateCustomerByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthCustomerId;
            name?: AppHealthCustomerName;
        },
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

        // update by id
        await this.repository.updateById(
            customer,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const customerRegister = this.publisher.mergeObjectContext(
            customer,
        );

        customerRegister.updated(customer); // apply event to model events
        customerRegister.commit(); // commit all events of model
    }
}
