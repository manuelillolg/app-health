/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateLanguagesService } from './app-health-create-languages.service';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthMockLanguageRepository } from '../../infrastructure/mock/app-health-mock-language.repository';

describe('AppHealthCreateLanguagesService', () =>
{
    let service: AppHealthCreateLanguagesService;
    let mockRepository: AppHealthMockLanguageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateLanguagesService,
                AppHealthMockLanguageRepository,
                {
                    provide : AppHealthILanguageRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateLanguagesService);
        mockRepository = module.get(AppHealthMockLanguageRepository);
    });

    describe('main', () =>
    {
        test('CreateLanguagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create languages and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
