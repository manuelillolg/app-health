import { AppHealthApplicationIntegration, AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationIntegrationService
{
    constructor(
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationIntegration>
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
