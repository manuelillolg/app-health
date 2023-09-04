/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApplicationAuthorizationDto, AppHealthDeleteApplicationAuthorizationByIdHandler } from '@api/app-health/application-authorization';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] application-authorization')
@Controller('app-health/application-authorization/delete')
export class AppHealthDeleteApplicationAuthorizationByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationAuthorizationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application-authorization by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthApplicationAuthorizationDto })
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
