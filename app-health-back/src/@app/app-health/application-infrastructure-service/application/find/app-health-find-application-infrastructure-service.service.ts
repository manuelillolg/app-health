import { AppHealthApplicationInfrastructureService, AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationInfrastructureServiceService
{
    constructor(
        private readonly repository: AppHealthIApplicationInfrastructureServiceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
