import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateLanguagesCommand } from '@app/app-health/language';
import { appHealthMockLanguageData } from '@app/app-health/language';

@Injectable()
export class AppHealthLanguageSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateLanguagesCommand(
            appHealthMockLanguageData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
