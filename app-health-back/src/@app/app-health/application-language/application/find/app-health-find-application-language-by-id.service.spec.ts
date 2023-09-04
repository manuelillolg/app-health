import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthFindApplicationLanguageByIdService } from './app-health-find-application-language-by-id.service';
import { AppHealthApplicationLanguageId } from '../../domain/value-objects';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthMockApplicationLanguageRepository } from '../../infrastructure/mock/app-health-mock-application-language.repository';

describe('AppHealthFindApplicationLanguageByIdService', () =>
{
    let service: AppHealthFindApplicationLanguageByIdService;
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
                AppHealthFindApplicationLanguageByIdService,
                AppHealthMockApplicationLanguageRepository,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindApplicationLanguageByIdService);
        repository = module.get(AppHealthIApplicationLanguageRepository);
        mockRepository = module.get(AppHealthMockApplicationLanguageRepository);
    });

    describe('main', () =>
    {
        test('FindApplicationLanguageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find applicationLanguage by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthApplicationLanguageId(appHealthMockApplicationLanguageData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
