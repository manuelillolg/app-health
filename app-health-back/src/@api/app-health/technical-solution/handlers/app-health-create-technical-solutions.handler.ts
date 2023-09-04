import { AppHealthCreateTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthCreateTechnicalSolutionInput } from '@api/graphql';
import { AppHealthCreateTechnicalSolutionsCommand } from '@app/app-health/technical-solution';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthCreateTechnicalSolutionsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AppHealthCreateTechnicalSolutionInput[] | AppHealthCreateTechnicalSolutionDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new AppHealthCreateTechnicalSolutionsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
