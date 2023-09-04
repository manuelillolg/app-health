import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';

@Injectable()
export class AppHealthPaginateAuthorizationInterfacesService
{
    constructor(
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AppHealthAuthorizationInterface>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
