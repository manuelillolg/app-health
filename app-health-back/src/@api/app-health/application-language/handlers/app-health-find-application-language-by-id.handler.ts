import { AppHealthApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { AppHealthFindApplicationLanguageByIdQuery } from '@app/app-health/application-language';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApplicationLanguageByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        return await this.queryBus.ask(new AppHealthFindApplicationLanguageByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
