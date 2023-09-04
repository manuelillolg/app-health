import { AppHealthCreatedCustomerEvent } from './app-health-created-customer.event';

export class AppHealthCreatedCustomersEvent
{
    constructor(
        public readonly customers: AppHealthCreatedCustomerEvent[],
    ) {}
}
