import { AppHealthCreateLanguageDto } from '@api/app-health/language';
import { AppHealthCreateLanguageInput } from '@api/graphql';
import { AppHealthCreateLanguagesCommand } from '@app/app-health/language';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateLanguagesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateLanguageInput[] | AppHealthCreateLanguageDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateLanguagesCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
