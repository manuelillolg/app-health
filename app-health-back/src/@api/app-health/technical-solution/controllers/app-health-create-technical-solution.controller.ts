/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppHealthCreateTechnicalSolutionDto, AppHealthCreateTechnicalSolutionHandler, AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { Timezone } from '@aurorajs.dev/core';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[app-health] technical-solution')
@Controller('app-health/technical-solution/create')
export class AppHealthCreateTechnicalSolutionController
{
    constructor(
        private readonly handler: AppHealthCreateTechnicalSolutionHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create technical-solution' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AppHealthTechnicalSolutionDto })
    async main(
        @Body() payload: AppHealthCreateTechnicalSolutionDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
