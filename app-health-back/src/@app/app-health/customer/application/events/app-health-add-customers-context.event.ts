import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';
import { AppHealthCreatedCustomerEvent } from './app-health-created-customer.event';
import { AppHealthCreatedCustomersEvent } from './app-health-created-customers.event';
import { AppHealthUpdatedCustomerEvent } from './app-health-updated-customer.event';
import { AppHealthUpdatedCustomersEvent } from './app-health-updated-customers.event';
import { AppHealthDeletedCustomerEvent } from './app-health-deleted-customer.event';
import { AppHealthDeletedCustomersEvent } from './app-health-deleted-customers.event';

export class AppHealthAddCustomersContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthCustomer[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AppHealthCreatedCustomersEvent(
                this.aggregateRoots.map(customer =>
                    new AppHealthCreatedCustomerEvent(
                        customer.id.value,
                        customer.name.value,
                        customer.createdAt?.value,
                        customer.updatedAt?.value,
                        customer.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedCustomersEvent(
                this.aggregateRoots.map(customer =>
                    new AppHealthUpdatedCustomerEvent(
                        customer.id.value,
                        customer.name.value,
                        customer.createdAt?.value,
                        customer.updatedAt?.value,
                        customer.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedCustomersEvent(
                this.aggregateRoots.map(customer =>
                    new AppHealthDeletedCustomerEvent(
                        customer.id.value,
                        customer.name.value,
                        customer.createdAt?.value,
                        customer.updatedAt?.value,
                        customer.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
