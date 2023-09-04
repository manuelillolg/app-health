import { AppHealthCreateLanguageDto, AppHealthLanguageDto } from '@api/app-health/language';
import { AppHealthCreateLanguageInput, AppHealthLanguage } from '@api/graphql';
import { AppHealthCreateLanguageCommand, AppHealthFindLanguageByIdQuery } from '@app/app-health/language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateLanguageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateLanguageInput | AppHealthCreateLanguageDto,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateLanguageCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindLanguageByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
