import { AppHealthCreateApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthCreateApplicationLanguageInput } from '@api/graphql';
import { AppHealthCreateApplicationLanguagesCommand } from '@app/app-health/application-language';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateApplicationLanguagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateApplicationLanguageInput[] | AppHealthCreateApplicationLanguageDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationLanguagesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
