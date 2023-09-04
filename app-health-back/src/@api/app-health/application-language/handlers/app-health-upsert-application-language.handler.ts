import { AppHealthApplicationLanguageDto, AppHealthUpdateApplicationLanguageByIdDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthUpdateApplicationLanguageByIdInput } from '@api/graphql';
import { AppHealthFindApplicationLanguageByIdQuery, AppHealthUpsertApplicationLanguageCommand } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpsertApplicationLanguageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationLanguageByIdInput | AppHealthUpdateApplicationLanguageByIdDto,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        await this.commandBus.dispatch(new AppHealthUpsertApplicationLanguageCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationLanguageByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
