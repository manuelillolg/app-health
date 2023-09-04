import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureService } from '../../domain/app-health-application-infrastructure-service.aggregate';

@Injectable()
export class AppHealthPaginateApplicationInfrastuctureServicesService
{
    constructor(
        private readonly repository: AppHealthIApplicationInfrastructureServiceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthApplicationInfrastructureService>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
