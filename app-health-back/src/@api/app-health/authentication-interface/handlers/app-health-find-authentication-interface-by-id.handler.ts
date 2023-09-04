import { AppHealthAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { AppHealthFindAuthenticationInterfaceByIdQuery } from '@app/app-health/authentication-interface';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindAuthenticationInterfaceByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface | AppHealthAuthenticationInterfaceDto>
    {
        return await this.queryBus.ask(new AppHealthFindAuthenticationInterfaceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
