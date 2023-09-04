import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationIntegrationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationIntegration[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
