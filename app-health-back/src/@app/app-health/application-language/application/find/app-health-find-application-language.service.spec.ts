import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthFindApplicationLanguageService } from './app-health-find-application-language.service';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthMockApplicationLanguageRepository } from '../../infrastructure/mock/app-health-mock-application-language.repository';

describe('AppHealthFindApplicationLanguageService', () =>
{
    let service: AppHealthFindApplicationLanguageService;
    let repository: AppHealthIApplicationLanguageRepository;
    let mockRepository: AppHealthMockApplicationLanguageRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthFindApplicationLanguageService,
                AppHealthMockApplicationLanguageRepository,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationLanguageService);
        repository = module.get(AppHealthIApplicationLanguageRepository);
        mockRepository = module.get(AppHealthMockApplicationLanguageRepository);
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationLanguageService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationLanguage', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
