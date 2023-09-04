import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationDatabaseRepository } from '../../domain/app-health-application-database.repository';
import { AppHealthApplicationDatabase } from '../../domain/app-health-application-database.aggregate';
import { AppHealthApplicationDatabaseId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationDatabaseByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationDatabaseRepository,
    ) {}

    async main(
        id: AppHealthApplicationDatabaseId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationDatabase>
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
