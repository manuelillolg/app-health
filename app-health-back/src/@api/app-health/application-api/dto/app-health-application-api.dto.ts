/* eslint-disable indent */
import { AppHealthApiInterfaceTypeDto } from '@api/app-health/api-interface-type';
import { AppHealthApplicationDto } from '@api/app-health/application';
import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthApplicationApiDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'applicationId [input here api field description]',
        example    : '209e8dce-ce93-5b3d-a4f3-06ce49207393',
    })
    applicationId: string;

    @ApiProperty({
        type       : () => AppHealthApplicationDto,
        description: 'AppHealthApplication [input here api field description]',
    })
    application?: AppHealthApplicationDto;

    @ApiProperty({
        type       : String,
        description: 'apiInterfaceTypeId [input here api field description]',
        example    : '8b85608c-92e7-5a04-852e-5efe2826a905',
    })
    apiInterfaceTypeId: string;

    @ApiProperty({
        type       : () => AppHealthApiInterfaceTypeDto,
        description: 'AppHealthApiInterfaceType [input here api field description]',
    })
    apiInterfaceType?: AppHealthApiInterfaceTypeDto;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score: number;

    @ApiProperty({
        type       : Object,
        description: 'documentations [input here api field description]',
    })
    documentations?: any;

    @ApiProperty({
        type       : Number,
        description: 'requestsPerDay [input here api field description]',
    })
    requestsPerDay?: number;

    @ApiProperty({
        type       : String,
        description: 'applicationInfrastructureServiceId [input here api field description]',
        example    : '4500f7d8-50e3-58a0-8426-7e7b78402710',
    })
    applicationInfrastructureServiceId: string;

    @ApiProperty({
        type       : () => AppHealthApplicationInfrastructureServiceDto,
        description: 'AppHealthApplicationInfrastructureService [input here api field description]',
    })
    applicationInfrastructureService?: AppHealthApplicationInfrastructureServiceDto;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}
