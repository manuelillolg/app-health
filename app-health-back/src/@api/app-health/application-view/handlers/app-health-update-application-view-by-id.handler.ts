import { AppHealthApplicationViewDto, AppHealthUpdateApplicationViewByIdDto } from '@api/app-health/application-view';
import { AppHealthApplicationView, AppHealthUpdateApplicationViewByIdInput } from '@api/graphql';
import { AppHealthFindApplicationViewByIdQuery, AppHealthUpdateApplicationViewByIdCommand } from '@app/app-health/application-view';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApplicationViewByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApplicationViewByIdInput | AppHealthUpdateApplicationViewByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApplicationView | AppHealthApplicationViewDto>
    {
        const applicationView = await this.queryBus.ask(new AppHealthFindApplicationViewByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, applicationView);

        await this.commandBus.dispatch(new AppHealthUpdateApplicationViewByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindApplicationViewByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
