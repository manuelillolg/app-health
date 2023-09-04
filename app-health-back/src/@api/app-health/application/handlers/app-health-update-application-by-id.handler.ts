import { AppHealthApplicationDto, AppHealthUpdateApplicationByIdDto } from '@api/app-health/application';
import { AppHealthApplication, AppHealthUpdateApplicationByIdInput } from '@api/graphql';
import { AppHealthFindApplicationByIdQuery, AppHealthUpdateApplicationByIdCommand } from '@app/app-health/application';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationByIdInput | AppHealthUpdateApplicationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplication | AppHealthApplicationDto>
    {
        const application = await this.queryBus.ask(new AppHealthFindApplicationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, application);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
