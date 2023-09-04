import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AppHealthCreateTechnicalSolutionsCommand } from '@app/app-health/technical-solution';
import { appHealthMockTechnicalSolutionData } from '@app/app-health/technical-solution';

@Injectable()
export class AppHealthTechnicalSolutionSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateTechnicalSolutionsCommand(
            appHealthMockTechnicalSolutionData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
