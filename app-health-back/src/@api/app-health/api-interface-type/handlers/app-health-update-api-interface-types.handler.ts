import { AppHealthApiInterfaceTypeDto, AppHealthUpdateApiInterfaceTypesDto } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType, AppHealthUpdateApiInterfaceTypesInput } from '@api/graphql';
import { AppHealthGetApiInterfaceTypesQuery, AppHealthUpdateApiInterfaceTypesCommand } from '@app/app-health/api-interface-type';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateApiInterfaceTypesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateApiInterfaceTypesInput | AppHealthUpdateApiInterfaceTypesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthApiInterfaceType | AppHealthApiInterfaceTypeDto>
    {
        await this.commandBus.dispatch(new AppHealthUpdateApiInterfaceTypesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthGetApiInterfaceTypesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
