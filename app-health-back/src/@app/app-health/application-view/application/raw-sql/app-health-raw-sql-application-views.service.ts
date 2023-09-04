import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthApplicationView } from '../../domain/app-health-application-view.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationViewsService
{
    constructor(
        private readonly repository: AppHealthIApplicationViewRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationView[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
