import { AppHealthLanguageDto, AppHealthUpdateLanguageByIdDto } from '@api/app-health/language';
import { AppHealthLanguage, AppHealthUpdateLanguageByIdInput } from '@api/graphql';
import { AppHealthFindLanguageByIdQuery, AppHealthUpdateLanguageByIdCommand } from '@app/app-health/language';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthUpdateLanguageByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AppHealthUpdateLanguageByIdInput | AppHealthUpdateLanguageByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AppHealthLanguage | AppHealthLanguageDto>
    {
        const language = await this.queryBus.ask(new AppHealthFindLanguageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, language);

        await this.commandBus.dispatch(new AppHealthUpdateLanguageByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AppHealthFindLanguageByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
