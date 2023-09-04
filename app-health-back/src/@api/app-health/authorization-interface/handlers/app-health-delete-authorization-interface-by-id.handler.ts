import { AppHealthAuthorizationInterfaceDto } from '@api/app-health/authorization-interface';
import { AppHealthAuthorizationInterface } from '@api/graphql';
import { AppHealthDeleteAuthorizationInterfaceByIdCommand, AppHealthFindAuthorizationInterfaceByIdQuery } from '@app/app-health/authorization-interface';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteAuthorizationInterfaceByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthAuthorizationInterface | AppHealthAuthorizationInterfaceDto>
    {
        const authorizationInterface = await this.queryBus.ask(new AppHealthFindAuthorizationInterfaceByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteAuthorizationInterfaceByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return authorizationInterface;
    }
}
