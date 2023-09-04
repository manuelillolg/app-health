import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthRawSQLApplicationLanguagesService } from './app-health-raw-sql-application-languages.service';
import { AppHealthIApplicationLanguageRepository } from '../../domain/app-health-application-language.repository';
import { AppHealthMockApplicationLanguageRepository } from '../../infrastructure/mock/app-health-mock-application-language.repository';

describe('AppHealthRawSQLApplicationLanguagesService ', () =>
{
    let service: AppHealthRawSQLApplicationLanguagesService ;
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
                AppHealthRawSQLApplicationLanguagesService ,
                AppHealthMockApplicationLanguageRepository,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useValue: {
                        rawSQL: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(AppHealthRawSQLApplicationLanguagesService );
        repository      = module.get(AppHealthIApplicationLanguageRepository);
        mockRepository  = module.get(AppHealthMockApplicationLanguageRepository);
    });

    describe('main', () =>
    {
        test('RawSQLApplicationLanguagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get applicationLanguages', async () =>
        {
            jest.spyOn(repository, 'rawSQL').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});
