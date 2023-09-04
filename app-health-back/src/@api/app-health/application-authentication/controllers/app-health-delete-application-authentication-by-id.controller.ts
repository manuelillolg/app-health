/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthenticationDto, AppHealthDeleteApplicationAuthenticationByIdHandler } from '@api/app-health/application-authentication';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authentication')
@Controller('app-health/application-authentication/delete')
export class AppHealthDeleteApplicationAuthenticationByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationAuthenticationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-authentication by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationAuthenticationDto })
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
