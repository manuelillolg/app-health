import { AppHealthLanguageDto, AppHealthUpdateLanguageByIdDto } from '@api/app-health/language';
import { AppHealthLanguage, AppHealthUpdateLanguageByIdInput } from '@api/graphql';
import { AppHealthFindLanguageByIdQuery, AppHealthUpsertLanguageCommand } from '@app/app-health/language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertLanguageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateLanguageByIdInput | AppHealthUpdateLanguageByIdDto,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertLanguageCommand(
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
