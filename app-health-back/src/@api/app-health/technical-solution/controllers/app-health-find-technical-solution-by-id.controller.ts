/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthFindTechnicalSolutionByIdHandler, AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solution/find')
export class AppHealthFindTechnicalSolutionByIdController
{
    constructor(
        private readonly handler: AppHealthFindTechnicalSolutionByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find technical-solution by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: AppHealthTechnicalSolutionDto })
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
