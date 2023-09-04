import { AppHealthLanguageDto } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { AppHealthFindLanguageQuery } from '@app/app-health/language';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindLanguageHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        return await this.queryBus.ask(new AppHealthFindLanguageQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
