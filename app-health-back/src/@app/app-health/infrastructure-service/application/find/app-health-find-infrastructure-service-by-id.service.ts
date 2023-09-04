import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';
import { AppHealthInfrastructureServiceId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindInfrastructureServiceByIdService
{
    constructor(
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        id: AppHealthInfrastructureServiceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthInfrastructureService>
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
