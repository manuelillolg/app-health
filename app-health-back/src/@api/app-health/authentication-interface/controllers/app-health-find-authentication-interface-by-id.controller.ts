/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthAuthenticationInterfaceDto, AppHealthFindAuthenticationInterfaceByIdHandler } from '@api/app-health/authentication-interface';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] authentication-interface')
@Controller('app-health/authentication-interface/find')
export class AppHealthFindAuthenticationInterfaceByIdController
{
    constructor(
        private readonly handler: AppHealthFindAuthenticationInterfaceByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find authentication-interface by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthAuthenticationInterfaceDto })
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
