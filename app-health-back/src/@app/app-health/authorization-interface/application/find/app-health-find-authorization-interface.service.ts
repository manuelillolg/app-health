import { AppHealthAuthorizationInterface, AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindAuthorizationInterfaceService
{
    constructor(
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthAuthorizationInterface>
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
