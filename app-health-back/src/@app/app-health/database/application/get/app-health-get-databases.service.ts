import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';

@Injectable()
export class AppHealthGetDatabasesService
{
    constructor(
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthDatabase[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
