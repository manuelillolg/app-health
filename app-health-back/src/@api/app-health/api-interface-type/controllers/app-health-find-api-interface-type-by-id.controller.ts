/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthApiInterfaceTypeDto, AppHealthFindApiInterfaceTypeByIdHandler } from '@api/app-health/api-interface-type';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] api-interface-type')
@Controller('app-health/api-interface-type/find')
export class AppHealthFindApiInterfaceTypeByIdController
{
    constructor(
        private readonly handler: AppHealthFindApiInterfaceTypeByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find api-interface-type by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthApiInterfaceTypeDto })
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
