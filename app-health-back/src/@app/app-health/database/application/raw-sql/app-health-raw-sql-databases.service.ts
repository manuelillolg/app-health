import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';

@Injectable()
export class AppHealthRawSQLDatabasesService
{
    constructor(
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthDatabase[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
