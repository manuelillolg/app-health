/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthUpdateLanguageByIdService } from './app-health-update-language-by-id.service';
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

describe('AppHealthUpdateLanguageByIdService', () =>
{
    let service: AppHealthUpdateLanguageByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthUpdateLanguageByIdService,
                AppHealthMockLanguageRepository,
                {
                    provide : AppHealthILanguageRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthUpdateLanguageByIdService);
    });

    describe('main', () =>
    {
        test('AppHealthUpdateLanguageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a language and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new AppHealthLanguageId(appHealthMockLanguageData[0].id),
                        name: new AppHealthLanguageName(appHealthMockLanguageData[0].name),
                        versions: new AppHealthLanguageVersions(appHealthMockLanguageData[0].versions),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
