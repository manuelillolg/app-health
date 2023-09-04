/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateTechnicalSolutionDto, AppHealthCreateTechnicalSolutionsHandler, AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solutions/create')
export class AppHealthCreateTechnicalSolutionsController
{
    constructor(
        private readonly handler: AppHealthCreateTechnicalSolutionsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create technical-solutions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AppHealthTechnicalSolutionDto]})
    @ApiBody({ type: [AppHealthCreateTechnicalSolutionDto]})
    async main(
        @Body() payload: AppHealthCreateTechnicalSolutionDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
