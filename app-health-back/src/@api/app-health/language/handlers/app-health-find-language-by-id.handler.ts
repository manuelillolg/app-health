import { AppHealthLanguageDto } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { AppHealthFindLanguageByIdQuery } from '@app/app-health/language';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindLanguageByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        return await this.queryBus.ask(new AppHealthFindLanguageByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
