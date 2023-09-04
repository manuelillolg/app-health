import { AppHealthApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthentication } from '@api/graphql';
import { AppHealthFindApplicationAuthenticationByIdQuery } from '@app/app-health/application-authentication';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationAuthenticationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthentication | AppHealthApplicationAuthenticationDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationAuthenticationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
