/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthTechnicalSolutionDto, AppHealthUpdateTechnicalSolutionsDto, AppHealthUpdateTechnicalSolutionsHandler } from '@api/app-health/technical-solution';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solutions/update')
export class AppHealthUpdateTechnicalSolutionsController
{
    constructor(
        private readonly handler: AppHealthUpdateTechnicalSolutionsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update technical-solutions' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AppHealthTechnicalSolutionDto })
    async main(
        @Body() payload: AppHealthUpdateTechnicalSolutionsDto,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
