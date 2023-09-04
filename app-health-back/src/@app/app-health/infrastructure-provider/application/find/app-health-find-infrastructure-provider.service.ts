import { AppHealthIInfrastructureProviderRepository, AppHealthInfrastructureProvider } from '@app/app-health/infrastructure-provider';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindInfrastructureProviderService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthInfrastructureProvider>
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
