/* eslint-disable indent */
import { AppHealthApplicationDto } from '@api/app-health/application';
import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthAuthenticationInterfaceDto } from '@api/app-health/authentication-interface';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthApplicationAuthenticationDto
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
        description: 'authenticationInterfaceId [input here api field description]',
        example    : '744828e4-620e-56ee-a497-49ffa21a21fa',
    })
    authenticationInterfaceId: string;

    @ApiProperty({
        type       : () => AppHealthAuthenticationInterfaceDto,
        description: 'AppHealthAuthenticationInterface [input here api field description]',
    })
    authenticationInterface?: AppHealthAuthenticationInterfaceDto;

    @ApiProperty({
        type       : Number,
        description: 'totalUsers [input here api field description]',
    })
    totalUsers?: number;

    @ApiProperty({
        type       : Number,
        description: 'score [input here api field description]',
    })
    score: number;

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
