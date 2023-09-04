import { AppHealthFindLanguageByIdHandler } from '@api/app-health/language';
import { AppHealthLanguage } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindLanguageByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindLanguageByIdHandler,
    ) {}

    @Query('appHealthFindLanguageById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
