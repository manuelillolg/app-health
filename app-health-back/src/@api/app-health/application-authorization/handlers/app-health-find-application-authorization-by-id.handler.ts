import { AppHealthApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationAuthorization } from '@api/graphql';
import { AppHealthFindApplicationAuthorizationByIdQuery } from '@app/app-health/application-authorization';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationAuthorizationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationAuthorization | AppHealthApplicationAuthorizationDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationAuthorizationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
