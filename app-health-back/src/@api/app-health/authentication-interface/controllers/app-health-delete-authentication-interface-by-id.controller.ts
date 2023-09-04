/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthDeleteAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interface/delete')
export class AppHealthDeleteAuthenticationInterfaceByIdController
{
    constructor(
        private readonly handler: AppHealthDeleteAuthenticationInterfaceByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete authentication-interface by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AppHealthAuthenticationInterfaceDto })
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
