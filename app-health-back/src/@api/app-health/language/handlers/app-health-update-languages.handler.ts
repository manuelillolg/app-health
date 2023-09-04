import { AppHealthLanguageDto, AppHealthUpdateLanguagesDto } from '@api/app-health/language';
import { AppHealthLanguage, AppHealthUpdateLanguagesInput } from '@api/graphql';
import { AppHealthGetLanguagesQuery, AppHealthUpdateLanguagesCommand } from '@app/app-health/language';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateLanguagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateLanguagesInput | AppHealthUpdateLanguagesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateLanguagesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetLanguagesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
