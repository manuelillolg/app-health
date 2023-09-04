import { AppHealthAuthenticationInterface, AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindAuthenticationInterfaceService
{
    constructor(
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthAuthenticationInterface>
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
