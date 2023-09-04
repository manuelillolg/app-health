import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProvider } from '../../domain/app-health-infrastructure-provider.aggregate';
import { AppHealthInfrastructureProviderId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindInfrastructureProviderByIdService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        id: AppHealthInfrastructureProviderId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthInfrastructureProvider>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
