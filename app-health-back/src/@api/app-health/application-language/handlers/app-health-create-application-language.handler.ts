import { AppHealthApplicationLanguageDto, AppHealthCreateApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthApplicationLanguage, AppHealthCreateApplicationLanguageInput } from '@api/graphql';
import { AppHealthCreateApplicationLanguageCommand, AppHealthFindApplicationLanguageByIdQuery } from '@app/app-health/application-language';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationLanguageHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationLanguageInput | AppHealthCreateApplicationLanguageDto,
        timezone?: string,
    ): Promise<AppHealthApplicationLanguage | AppHealthApplicationLanguageDto>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationLanguageCommand(
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
