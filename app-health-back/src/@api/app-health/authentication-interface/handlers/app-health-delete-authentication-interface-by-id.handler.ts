import { AppHealthAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { AppHealthAuthenticationInterface } from '@api/graphql';
import { AppHealthDeleteAuthenticationInterfaceByIdCommand, AppHealthFindAuthenticationInterfaceByIdQuery } from '@app/app-health/authentication-interface';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteAuthenticationInterfaceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthenticationInterface | AppHealthAuthenticationInterfaceDto>
    {
        const authenticationInterface = await this.queryBus.ask(new AppHealthFindAuthenticationInterfaceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteAuthenticationInterfaceByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return authenticationInterface;
    }
}
