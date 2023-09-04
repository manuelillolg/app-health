import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthFindLanguageByIdService } from './app-health-find-language-by-id.service';
import { AppHealthLanguageId } from '../../domain/value-objects';
import { AppHealthILanguageRepository } from '../../domain/app-health-language.repository';
import { AppHealthMockLanguageRepository } from '../../infrastructure/mock/app-health-mock-language.repository';

describe('AppHealthFindLanguageByIdService', () =>
{
    let service: AppHealthFindLanguageByIdService;
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
                AppHealthFindLanguageByIdService,
                AppHealthMockLanguageRepository,
                {
                    provide : AppHealthILanguageRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthFindLanguageByIdService);
        repository = module.get(AppHealthILanguageRepository);
        mockRepository = module.get(AppHealthMockLanguageRepository);
    });

    describe('main', () =>
    {
        test('FindLanguageByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find language by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AppHealthLanguageId(appHealthMockLanguageData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
