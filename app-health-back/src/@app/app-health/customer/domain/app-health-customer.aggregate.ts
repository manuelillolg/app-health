/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from './value-objects';
import { AppHealthCreatedCustomerEvent } from '../application/events/app-health-created-customer.event';
import { AppHealthUpdatedCustomerEvent } from '../application/events/app-health-updated-customer.event';
import { AppHealthDeletedCustomerEvent } from '../application/events/app-health-deleted-customer.event';

export class AppHealthCustomer extends AggregateRoot
{
    id: AppHealthCustomerId;
    name: AppHealthCustomerName;
    createdAt: AppHealthCustomerCreatedAt;
    updatedAt: AppHealthCustomerUpdatedAt;
    deletedAt: AppHealthCustomerDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthCustomerId,
        name: AppHealthCustomerName,
        createdAt: AppHealthCustomerCreatedAt,
        updatedAt: AppHealthCustomerUpdatedAt,
        deletedAt: AppHealthCustomerDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: AppHealthCustomerId,
        name: AppHealthCustomerName,
        createdAt: AppHealthCustomerCreatedAt,
        updatedAt: AppHealthCustomerUpdatedAt,
        deletedAt: AppHealthCustomerDeletedAt,

    ): AppHealthCustomer
    {
        return new AppHealthCustomer(
            id,
            name,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(customer: AppHealthCustomer): void
    {
        this.apply(
            new AppHealthCreatedCustomerEvent(
                customer.id.value,
                customer.name.value,
                customer.createdAt?.value,
                customer.updatedAt?.value,
                customer.deletedAt?.value,
            ),
        );
    }

    updated(customer: AppHealthCustomer): void
    {
        this.apply(
            new AppHealthUpdatedCustomerEvent(
                customer.id?.value,
                customer.name?.value,
                customer.createdAt?.value,
                customer.updatedAt?.value,
                customer.deletedAt?.value,
            ),
        );
    }

    deleted(customer: AppHealthCustomer): void
    {
        this.apply(
            new AppHealthDeletedCustomerEvent(
                customer.id.value,
                customer.name.value,
                customer.createdAt?.value,
                customer.updatedAt?.value,
                customer.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
