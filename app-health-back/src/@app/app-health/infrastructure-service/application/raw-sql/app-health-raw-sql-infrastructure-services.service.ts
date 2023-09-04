import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';

@Injectable()
export class AppHealthRawSQLInfrastructureServicesService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthInfrastructureService[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
