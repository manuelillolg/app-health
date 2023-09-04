import { AppHealthICustomerRepository } from '@app/app-health/customer';
import { AppHealthCustomerId } from '@app/app-health/customer/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteCustomerByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        id: AppHealthCustomerId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const customer = await this.repository
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
                customer.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const customerRegister = this.publisher.mergeObjectContext(customer);

        customerRegister.deleted(customer); // apply event to model events
        customerRegister.commit(); // commit all events of model
    }
}
