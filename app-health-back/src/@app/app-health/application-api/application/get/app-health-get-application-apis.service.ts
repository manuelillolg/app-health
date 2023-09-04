import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';

@Injectable()
export class AppHealthGetApplicationApisService
{
    constructor(
        private readonly repository: AppHealthIApplicationApiRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationApi[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
