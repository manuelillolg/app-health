import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthInfrastructureProvider } from '../../domain/app-health-infrastructure-provider.aggregate';

@Injectable()
export class AppHealthRawSQLInfrastructureProvidersService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthInfrastructureProvider[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
