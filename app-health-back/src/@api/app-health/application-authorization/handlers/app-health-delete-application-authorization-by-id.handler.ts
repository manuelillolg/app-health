import { AppHealthApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { AppHealthDeleteApplicationAuthorizationByIdCommand, AppHealthFindApplicationAuthorizationByIdQuery } from '@app/app-health/application-authorization';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationAuthorizationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization | AppHealthApplicationAuthorizationDto>
    {
        const applicationAuthorization = await this.queryBus.ask(new AppHealthFindApplicationAuthorizationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationAuthorizationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationAuthorization;
    }
}
