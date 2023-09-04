import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthCustomerResponse } from '../../domain/app-health-customer.response';
import { AppHealthCustomerMapper } from '../../domain/app-health-customer.mapper';
import { AppHealthRawSQLCustomersQuery } from './app-health-raw-sql-customers.query';
import { AppHealthRawSQLCustomersService } from './app-health-raw-sql-customers.service';

@QueryHandler(AppHealthRawSQLCustomersQuery)
export class AppHealthRawSQLCustomersQueryHandler implements IQueryHandler<AppHealthRawSQLCustomersQuery>
{
    private readonly mapper: AppHealthCustomerMapper = new AppHealthCustomerMapper();

    constructor(
        private readonly rawSQLCustomersService: AppHealthRawSQLCustomersService,
    ) {}

    async execute(query: AppHealthRawSQLCustomersQuery): Promise<AppHealthCustomerResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLCustomersService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
