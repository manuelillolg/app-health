import { AppHealthLanguageDto } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { AppHealthDeleteLanguageByIdCommand, AppHealthFindLanguageByIdQuery } from '@app/app-health/language';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteLanguageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        const language = await this.queryBus.ask(new AppHealthFindLanguageByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteLanguageByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return language;
    }
}
