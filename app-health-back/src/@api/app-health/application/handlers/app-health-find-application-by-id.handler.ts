import { AppHealthApplicationDto } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { AppHealthFindApplicationByIdQuery } from '@app/app-health/application';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplication | AppHealthApplicationDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
