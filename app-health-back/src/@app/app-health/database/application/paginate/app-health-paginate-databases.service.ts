import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';

@Injectable()
export class AppHealthPaginateDatabasesService
{
    constructor(
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthDatabase>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
