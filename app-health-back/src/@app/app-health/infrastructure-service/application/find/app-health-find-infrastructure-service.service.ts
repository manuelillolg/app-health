import { AppHealthIInfrastructureServiceRepository, AppHealthInfrastructureService } from '@app/app-health/infrastructure-service';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindInfrastructureServiceService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthInfrastructureService>
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
