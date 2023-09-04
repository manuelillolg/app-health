import { AppHealthDeleteInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteInfrastructureServiceByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureServiceByIdHandler,
    ) {}

    @Mutation('appHealthDeleteInfrastructureServiceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
