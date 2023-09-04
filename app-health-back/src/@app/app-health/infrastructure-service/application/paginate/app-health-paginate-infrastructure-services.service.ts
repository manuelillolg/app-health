import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';

@Injectable()
export class AppHealthPaginateInfrastructureServicesService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthInfrastructureService>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
