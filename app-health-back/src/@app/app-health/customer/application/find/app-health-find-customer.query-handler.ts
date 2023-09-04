import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthCustomerResponse } from '../../domain/app-health-customer.response';
import { AppHealthCustomerMapper } from '../../domain/app-health-customer.mapper';
import { AppHealthFindCustomerQuery } from './app-health-find-customer.query';
import { AppHealthFindCustomerService } from './app-health-find-customer.service';

@QueryHandler(AppHealthFindCustomerQuery)
export class AppHealthFindCustomerQueryHandler implements IQueryHandler<AppHealthFindCustomerQuery>
{
    private readonly mapper: AppHealthCustomerMapper = new AppHealthCustomerMapper();

    constructor(
        private readonly findCustomerService: AppHealthFindCustomerService,
    ) {}

    async execute(query: AppHealthFindCustomerQuery): Promise<AppHealthCustomerResponse>
    {
        const customer = await this.findCustomerService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(customer);
    }
}
