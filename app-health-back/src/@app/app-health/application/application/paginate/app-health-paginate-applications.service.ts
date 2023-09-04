import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';

@Injectable()
export class AppHealthPaginateApplicationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthApplication>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
