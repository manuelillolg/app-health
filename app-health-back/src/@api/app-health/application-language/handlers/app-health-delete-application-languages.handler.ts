import { AppHealthApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { AppHealthDeleteApplicationLanguagesCommand, AppHealthGetApplicationLanguagesQuery } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationLanguagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage[] | AppHealthApplicationLanguageDto[]>
    {
        const applicationLanguages = await this.queryBus.ask(new AppHealthGetApplicationLanguagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationLanguagesCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return applicationLanguages;
    }
}
