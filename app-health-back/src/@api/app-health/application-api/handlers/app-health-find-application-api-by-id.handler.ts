import { AppHealthApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { AppHealthFindApplicationApiByIdQuery } from '@app/app-health/application-api';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationApiByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationApi | AppHealthApplicationApiDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationApiByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
