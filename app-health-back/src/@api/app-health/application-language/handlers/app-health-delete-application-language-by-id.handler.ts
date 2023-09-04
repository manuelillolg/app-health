import { AppHealthApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage } from '@api/graphql';
import { AppHealthDeleteApplicationLanguageByIdCommand, AppHealthFindApplicationLanguageByIdQuery } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationLanguageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        const applicationLanguage = await this.queryBus.ask(new AppHealthFindApplicationLanguageByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationLanguageByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return applicationLanguage;
    }
}
