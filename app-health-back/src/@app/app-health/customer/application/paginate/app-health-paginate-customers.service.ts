import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';

@Injectable()
export class AppHealthPaginateCustomersService
{
    constructor(
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthCustomer>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
