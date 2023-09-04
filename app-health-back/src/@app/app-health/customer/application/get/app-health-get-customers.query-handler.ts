import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthCustomerResponse } from '../../domain/app-health-customer.response';
import { AppHealthCustomerMapper } from '../../domain/app-health-customer.mapper';
import { AppHealthGetCustomersQuery } from './app-health-get-customers.query';
import { AppHealthGetCustomersService } from './app-health-get-customers.service';

@QueryHandler(AppHealthGetCustomersQuery)
export class AppHealthGetCustomersQueryHandler implements IQueryHandler<AppHealthGetCustomersQuery>
{
    private readonly mapper: AppHealthCustomerMapper = new AppHealthCustomerMapper();

    constructor(
        private readonly getCustomersService: AppHealthGetCustomersService,
    ) {}

    async execute(query: AppHealthGetCustomersQuery): Promise<AppHealthCustomerResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getCustomersService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}
