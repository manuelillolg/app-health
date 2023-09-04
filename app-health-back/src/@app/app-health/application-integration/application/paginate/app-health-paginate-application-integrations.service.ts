import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';

@Injectable()
export class AppHealthPaginateApplicationIntegrationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthApplicationIntegration>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
