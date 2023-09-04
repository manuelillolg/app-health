import { AppHealthApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { AppHealthFindApplicationLanguageQuery } from '@app/app-health/application-language';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationLanguageHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationLanguageQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
