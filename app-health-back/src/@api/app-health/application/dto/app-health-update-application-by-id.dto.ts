/* eslint-disable indent */
import { AppHealthApplicationType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthUpdateApplicationByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'technicalSolutionId [input here api field description]',
        example    : '94d9c3cf-5a66-5f4d-9301-77d58c85e2f1',
    })
    technicalSolutionId?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'description [input here api field description]',
    })
    description?: string;

    @ApiProperty({
        type       : String,
        description: 'businessImpact [input here api field description]',
    })
    businessImpact?: string;

    @ApiProperty({
        type       : AppHealthApplicationType,
        enum       : ['FRONTEND','SERVER','MOBILE','EMBEDDED'],
        description: 'type [input here api field description]',
    })
    type?: AppHealthApplicationType;

    @ApiProperty({
        type       : String,
        description: 'releaseDate [input here api field description]',
    })
    releaseDate?: string;

    @ApiProperty({
        type       : String,
        description: 'architectureDiagram [input here api field description]',
    })
    architectureDiagram?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'hasTenants [input here api field description]',
    })
    hasTenants?: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'hasLicensing [input here api field description]',
    })
    hasLicensing?: boolean;

    @ApiProperty({
        type       : Number,
        description: 'costLicensesPerYear [input here api field description]',
    })
    costLicensesPerYear?: number;

    @ApiProperty({
        type       : Number,
        description: 'requestsPerDay [input here api field description]',
    })
    requestsPerDay?: number;

}
