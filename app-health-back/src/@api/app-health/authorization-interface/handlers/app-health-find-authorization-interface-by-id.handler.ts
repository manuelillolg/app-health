import { AppHealthAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { AppHealthFindAuthorizationInterfaceByIdQuery } from '@app/app-health/authorization-interface';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindAuthorizationInterfaceByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        return await this.queryBus.ask(new AppHealthFindAuthorizationInterfaceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
