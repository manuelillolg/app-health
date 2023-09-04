import { AppHealthUpdatedCustomerEvent } from './app-health-updated-customer.event';

export class AppHealthUpdatedCustomersEvent
{
    constructor(
        public readonly customers: AppHealthUpdatedCustomerEvent[],
    ) {}
}
