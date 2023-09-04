import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthICustomerRepository } from '../../domain/app-health-customer.repository';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';
import { AppHealthCustomerId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindCustomerByIdService
{
    constructor(
        private readonly repository: AppHealthICustomerRepository,
    ) {}

    async main(
        id: AppHealthCustomerId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthCustomer>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
