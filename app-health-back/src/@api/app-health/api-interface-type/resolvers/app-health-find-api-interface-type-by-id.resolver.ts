import { AppHealthFindApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { AppHealthApiInterfaceType } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApiInterfaceTypeByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApiInterfaceTypeByIdHandler,
    ) {}

    @Query('appHealthFindApiInterfaceTypeById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
