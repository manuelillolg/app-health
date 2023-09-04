import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';

@Injectable()
export class AppHealthGetCustomersService
{
    constructor(
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthCustomer[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
