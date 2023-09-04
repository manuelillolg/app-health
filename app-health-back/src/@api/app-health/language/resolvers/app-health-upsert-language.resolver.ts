import { AppHealthUpsertLanguageHandler } from '@api/app-health/language';
import { AppHealthLanguage, AppHealthUpdateLanguageByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertLanguageResolver
{
    constructor(
        private readonly handler: AppHealthUpsertLanguageHandler,
    ) {}

    @Mutation('appHealthUpsertLanguage')
    async main(
        @Args('payload') payload: AppHealthUpdateLanguageByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthLanguage>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
