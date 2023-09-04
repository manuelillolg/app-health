import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIDatabaseRepository } from '../../domain/app-health-database.repository';
import { AppHealthDatabase } from '../../domain/app-health-database.aggregate';
import { AppHealthDatabaseId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindDatabaseByIdService
{
    constructor(
        private readonly repository: AppHealthIDatabaseRepository,
    ) {}

    async main(
        id: AppHealthDatabaseId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthDatabase>
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
