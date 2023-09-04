import { AppHealthApplicationAuthenticationDto, AppHealthUpdateApplicationAuthenticationsDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication, AppHealthUpdateApplicationAuthenticationsInput } from '@api/graphql';
import { AppHealthGetApplicationAuthenticationsQuery, AppHealthUpdateApplicationAuthenticationsCommand } from '@app/app-health/application-authentication';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationAuthenticationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationAuthenticationsInput | AppHealthUpdateApplicationAuthenticationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication | AppHealthApplicationAuthenticationDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationAuthenticationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationAuthenticationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
