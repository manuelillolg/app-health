import { AppHealthApplicationLanguageDto, AppHealthUpdateApplicationLanguagesDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthUpdateApplicationLanguagesInput } from '@api/graphql';
import { AppHealthGetApplicationLanguagesQuery, AppHealthUpdateApplicationLanguagesCommand } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationLanguagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationLanguagesInput | AppHealthUpdateApplicationLanguagesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApplicationLanguagesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApplicationLanguagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
