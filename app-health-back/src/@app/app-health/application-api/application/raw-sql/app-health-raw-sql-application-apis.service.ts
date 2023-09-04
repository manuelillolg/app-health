import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationApisService
{
    constructor(
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationApi[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
