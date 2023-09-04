/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthUpdateApplicationLanguageByIdService } from './app-health-update-application-language-by-id.service';
import {
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageVersion,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthMockApplicationLanguageRepository } from '../../infrastructure/mock/app-health-mock-application-language.repository';

describe('AppHealthUpdateApplicationLanguageByIdService', () =>
{
    let service: AppHealthUpdateApplicationLanguageByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateApplicationLanguageByIdService,
                AppHealthMockApplicationLanguageRepository,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateApplicationLanguageByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateApplicationLanguageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a applicationLanguage and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthApplicationLanguageId(appHealthMockApplicationLanguageData[0].id),
                        applicationId: new AppHealthApplicationLanguageApplicationId(appHealthMockApplicationLanguageData[0].applicationId),
                        languageId: new AppHealthApplicationLanguageLanguageId(appHealthMockApplicationLanguageData[0].languageId),
                        version: new AppHealthApplicationLanguageVersion(appHealthMockApplicationLanguageData[0].version),
                        score: new AppHealthApplicationLanguageScore(appHealthMockApplicationLanguageData[0].score),
                        codeQualityScore: new AppHealthApplicationLanguageCodeQualityScore(appHealthMockApplicationLanguageData[0].codeQualityScore),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
