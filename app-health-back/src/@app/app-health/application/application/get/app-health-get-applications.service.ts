import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';

@Injectable()
export class AppHealthGetApplicationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplication[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
