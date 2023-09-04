import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AppHealthCustomerResponse } from '../../domain/app-health-customer.response';
import { AppHealthCustomerMapper } from '../../domain/app-health-customer.mapper';
import { AppHealthCustomerId } from '../../domain/value-objects';
import { AppHealthFindCustomerByIdQuery } from './app-health-find-customer-by-id.query';
import { AppHealthFindCustomerByIdService } from './app-health-find-customer-by-id.service';

@QueryHandler(AppHealthFindCustomerByIdQuery)
export class AppHealthFindCustomerByIdQueryHandler implements IQueryHandler<AppHealthFindCustomerByIdQuery>
{
    private readonly mapper: AppHealthCustomerMapper = new AppHealthCustomerMapper();

    constructor(
        private readonly findCustomerByIdService: AppHealthFindCustomerByIdService,
    ) {}

    async execute(query: AppHealthFindCustomerByIdQuery): Promise<AppHealthCustomerResponse>
    {
        const customer = await this.findCustomerByIdService.main(
            new AppHealthCustomerId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(customer);
    }
}
