import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindLanguageService } from './app-health-find-language.service';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthMockLanguageRepository } from '../../infrastructure/mock/app-health-mock-language.repository';

describe('AppHealthFindLanguageService', () =>
{
    let service: AppHealthFindLanguageService;
    let repository: AppHealthILanguageRepository;
    let mockRepository: AppHealthMockLanguageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindLanguageService,
                AppHealthMockLanguageRepository,
                {
                    provide : AppHealthILanguageRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindLanguageService);
        repository = module.get(AppHealthILanguageRepository);
        mockRepository = module.get(AppHealthMockLanguageRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find language', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
