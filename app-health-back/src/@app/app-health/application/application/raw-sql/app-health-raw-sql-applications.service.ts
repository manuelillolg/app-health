import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplication[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
