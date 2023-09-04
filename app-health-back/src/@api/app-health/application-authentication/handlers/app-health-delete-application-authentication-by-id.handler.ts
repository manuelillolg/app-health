import { AppHealthApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { AppHealthDeleteApplicationAuthenticationByIdCommand, AppHealthFindApplicationAuthenticationByIdQuery } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationAuthenticationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication | AppHealthApplicationAuthenticationDto>
    {
        const applicationAuthentication = await this.queryBus.ask(new AppHealthFindApplicationAuthenticationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationAuthenticationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationAuthentication;
    }
}
