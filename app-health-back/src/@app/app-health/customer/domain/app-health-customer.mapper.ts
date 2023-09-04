import { IMapper, LiteralObject, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { AppHealthCustomer } from './app-health-customer.aggregate';
import { AppHealthCustomerResponse } from './app-health-customer.response';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from './value-objects';

export class AppHealthCustomerMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param customer
     */
    mapModelToAggregate(customer: LiteralObject, cQMetadata?: CQMetadata): AppHealthCustomer
    {
        if (!customer) return;

        return this.makeAggregate(customer, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param customers
     */
    mapModelsToAggregates(customers: LiteralObject[], cQMetadata?: CQMetadata): AppHealthCustomer[]
    {
        if (!Array.isArray(customers)) return;

        return customers.map(customer => this.makeAggregate(customer, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param customer
     */
    mapAggregateToResponse(customer: AppHealthCustomer): AppHealthCustomerResponse
    {
        return this.makeResponse(customer);
    }

    /**
     * Map array of aggregates to array responses
     * @param customers
     */
    mapAggregatesToResponses(customers: AppHealthCustomer[]): AppHealthCustomerResponse[]
    {
        if (!Array.isArray(customers)) return;

        return customers.map(customer => this.makeResponse(customer));
    }

    private makeAggregate(customer: LiteralObject, cQMetadata?: CQMetadata): AppHealthCustomer
    {
        return AppHealthCustomer.register(
            new AppHealthCustomerId(customer.id, { undefinable: true }),
            new AppHealthCustomerName(customer.name, { undefinable: true }),
            new AppHealthCustomerCreatedAt(customer.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthCustomerUpdatedAt(customer.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AppHealthCustomerDeletedAt(customer.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
        );
    }

    private makeResponse(customer: AppHealthCustomer): AppHealthCustomerResponse
    {
        if (!customer) return;

        return new AppHealthCustomerResponse(
            customer.id.value,
            customer.name.value,
            customer.createdAt.value,
            customer.updatedAt.value,
            customer.deletedAt.value,
        );
    }
}
