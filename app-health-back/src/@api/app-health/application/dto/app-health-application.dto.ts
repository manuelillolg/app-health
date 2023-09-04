/* eslint-disable indent */
import { AppHealthApplicationApiDto } from '@api/app-health/application-api';
import { AppHealthApplicationAuthenticationDto } from '@api/app-health/application-authentication';
import { AppHealthApplicationAuthorizationDto } from '@api/app-health/application-authorization';
import { AppHealthApplicationDatabaseDto } from '@api/app-health/application-database';
import { AppHealthApplicationInfrastructureServiceDto } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationIntegrationDto } from '@api/app-health/application-integration';
import { AppHealthApplicationLanguageDto } from '@api/app-health/application-language';
import { AppHealthApplicationViewDto } from '@api/app-health/application-view';
import { AppHealthTechnicalSolutionDto } from '@api/app-health/technical-solution';
import { AppHealthApplicationType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthApplicationDto
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
    technicalSolutionId: string;

    @ApiProperty({
        type       : () => AppHealthTechnicalSolutionDto,
        description: 'AppHealthTechnicalSolution [input here api field description]',
    })
    technicalSolution?: AppHealthTechnicalSolutionDto;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

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
    type: AppHealthApplicationType;

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
    hasTenants: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'hasLicensing [input here api field description]',
    })
    hasLicensing: boolean;

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

    @ApiProperty({
        type       : () => [AppHealthApplicationViewDto],
        description: 'views [input here api field description]',
    })
    views?: AppHealthApplicationViewDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationAuthenticationDto],
        description: 'authentications [input here api field description]',
    })
    authentications?: AppHealthApplicationAuthenticationDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationAuthorizationDto],
        description: 'authorizations [input here api field description]',
    })
    authorizations?: AppHealthApplicationAuthorizationDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationLanguageDto],
        description: 'languages [input here api field description]',
    })
    languages?: AppHealthApplicationLanguageDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationInfrastructureServiceDto],
        description: 'infrastructureServices [input here api field description]',
    })
    infrastructureServices?: AppHealthApplicationInfrastructureServiceDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationDatabaseDto],
        description: 'databases [input here api field description]',
    })
    databases?: AppHealthApplicationDatabaseDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationApiDto],
        description: 'apis [input here api field description]',
    })
    apis?: AppHealthApplicationApiDto[];

    @ApiProperty({
        type       : () => [AppHealthApplicationIntegrationDto],
        description: 'integrations [input here api field description]',
    })
    integrations?: AppHealthApplicationIntegrationDto[];

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
