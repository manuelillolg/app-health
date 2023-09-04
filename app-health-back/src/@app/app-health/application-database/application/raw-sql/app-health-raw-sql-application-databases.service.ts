import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthApplicationDatabase } from '../../domain/app-health-application-database.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationDatabasesService
{
    constructor(
        private readonly repository: AppHealthIApplicationDatabaseRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationDatabase[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
