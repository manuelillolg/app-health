import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationLanguageQueryHandler } from './app-health-find-application-language.query-handler';
import { AppHealthMockApplicationLanguageRepository } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.repository';
import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language/domain/app-health-application-language.repository';
import { AppHealthApplicationLanguageMapper } from '@app/app-health/application-language/domain/app-health-application-language.mapper';
import { AppHealthFindApplicationLanguageQuery } from './app-health-find-application-language.query';
import { AppHealthFindApplicationLanguageService } from './app-health-find-application-language.service';

describe('AppHealthFindApplicationLanguageQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationLanguageQueryHandler;
    let service: AppHealthFindApplicationLanguageService;
    let repository: AppHealthMockApplicationLanguageRepository;
    let mapper: AppHealthApplicationLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationLanguageQueryHandler,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useClass: AppHealthMockApplicationLanguageRepository,
                },
                {
                    provide : AppHealthFindApplicationLanguageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationLanguageQueryHandler>(AppHealthFindApplicationLanguageQueryHandler);
        service = module.get<AppHealthFindApplicationLanguageService>(AppHealthFindApplicationLanguageService);
        repository = <AppHealthMockApplicationLanguageRepository>module.get<AppHealthIApplicationLanguageRepository>(AppHealthIApplicationLanguageRepository);
        mapper = new AppHealthApplicationLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationLanguageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationLanguage founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationLanguageQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
