/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthDeleteInfrastructureProviderByIdHandler, AppHealthInfrastructureProviderDto } from '@api/app-health/infrastructure-provider';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] infrastructure-provider')
@Controller('app-health/infrastructure-provider/delete')
export class AppHealthDeleteInfrastructureProviderByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureProviderByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete infrastructure-provider by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthInfrastructureProviderDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
