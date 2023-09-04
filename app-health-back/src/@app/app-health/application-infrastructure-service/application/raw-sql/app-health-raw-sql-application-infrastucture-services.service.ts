import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationInfrastructureServiceRepository } from '../../domain/app-health-application-infrastructure-service.repository';
import { AppHealthApplicationInfrastructureService } from '../../domain/app-health-application-infrastructure-service.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationInfrastuctureServicesService
{
    constructor(
        private readonly repository: AppHealthIApplicationInfrastructureServiceRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationInfrastructureService[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
