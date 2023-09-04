import { AppHealthApplicationDto } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { AppHealthDeleteApplicationByIdCommand, AppHealthFindApplicationByIdQuery } from '@app/app-health/application';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthDeleteApplicationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplication | AppHealthApplicationDto>
    {
        const application = await this.queryBus.ask(new AppHealthFindApplicationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AppHealthDeleteApplicationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return application;
    }
}
