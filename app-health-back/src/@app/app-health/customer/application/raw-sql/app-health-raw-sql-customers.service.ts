import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';

@Injectable()
export class AppHealthRawSQLCustomersService
{
    constructor(
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthCustomer[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
