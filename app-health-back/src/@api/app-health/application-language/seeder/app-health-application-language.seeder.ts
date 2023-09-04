import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateApplicationLanguagesCommand } from '@app/app-health/application-language';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language';

@Injectable()
export class AppHealthApplicationLanguageSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateApplicationLanguagesCommand(
            appHealthMockApplicationLanguageData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
