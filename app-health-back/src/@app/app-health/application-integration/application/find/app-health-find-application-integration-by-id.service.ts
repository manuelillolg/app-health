import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationIntegrationRepository } from '../../domain/app-health-application-integration.repository';
import { AppHealthApplicationIntegration } from '../../domain/app-health-application-integration.aggregate';
import { AppHealthApplicationIntegrationId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationIntegrationByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        id: AppHealthApplicationIntegrationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationIntegration>
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
