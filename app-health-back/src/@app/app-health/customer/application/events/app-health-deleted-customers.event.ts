import { AppHealthDeletedCustomerEvent } from './app-health-deleted-customer.event';

export class AppHealthDeletedCustomersEvent
{
    constructor(
        public readonly customers: AppHealthDeletedCustomerEvent[],
    ) {}
}
