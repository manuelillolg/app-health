/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthCreateLanguageService } from './app-health-create-language.service';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthMockLanguageRepository } from '../../infrastructure/mock/app-health-mock-language.repository';

describe('AppHealthCreateLanguageService', () =>

{
    let service: AppHealthCreateLanguageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateLanguageService,
                AppHealthMockLanguageRepository,
                {
                    provide : AppHealthILanguageRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateLanguageService);
    });

    describe('main', () =>
    {
        test('AppHealthCreateLanguageService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a language and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthLanguageId(appHealthMockLanguageData[0].id),
                        name: new AppHealthLanguageName(appHealthMockLanguageData[0].name),
                        versions: new AppHealthLanguageVersions(appHealthMockLanguageData[0].versions),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
