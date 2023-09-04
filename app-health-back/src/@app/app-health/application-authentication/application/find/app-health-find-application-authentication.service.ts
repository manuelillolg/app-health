import { AppHealthApplicationAuthentication, AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationAuthenticationService
{
    constructor(
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationAuthentication>
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
