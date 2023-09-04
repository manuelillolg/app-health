import { AppHealthLanguageDto } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { AppHealthDeleteLanguagesCommand, AppHealthGetLanguagesQuery } from '@app/app-health/language';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteLanguagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthLanguage[] | AppHealthLanguageDto[]>
    {
        const languages = await this.queryBus.ask(new AppHealthGetLanguagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteLanguagesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return languages;
    }
}
