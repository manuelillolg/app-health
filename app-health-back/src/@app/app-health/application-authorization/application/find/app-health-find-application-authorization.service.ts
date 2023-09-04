import { AppHealthApplicationAuthorization, AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationAuthorizationService
{
    constructor(
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationAuthorization>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
