import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationLanguageByIdQueryHandler } from './app-health-find-application-language-by-id.query-handler';
import { AppHealthMockApplicationLanguageRepository } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.repository';
import { appHealthMockApplicationLanguageData } from '@app/app-health/application-language/infrastructure/mock/app-health-mock-application-language.data';
import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language/domain/app-health-application-language.repository';
import { AppHealthApplicationLanguageMapper } from '@app/app-health/application-language/domain/app-health-application-language.mapper';
import { AppHealthFindApplicationLanguageByIdQuery } from './app-health-find-application-language-by-id.query';
import { AppHealthFindApplicationLanguageByIdService } from './app-health-find-application-language-by-id.service';

describe('AppHealthFindApplicationLanguageByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationLanguageByIdQueryHandler;
    let service: AppHealthFindApplicationLanguageByIdService;
    let repository: AppHealthMockApplicationLanguageRepository;
    let mapper: AppHealthApplicationLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationLanguageByIdQueryHandler,
                {
                    provide : AppHealthIApplicationLanguageRepository,
                    useClass: AppHealthMockApplicationLanguageRepository,
                },
                {
                    provide : AppHealthFindApplicationLanguageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationLanguageByIdQueryHandler>(AppHealthFindApplicationLanguageByIdQueryHandler);
        service = module.get<AppHealthFindApplicationLanguageByIdService>(AppHealthFindApplicationLanguageByIdService);
        repository = <AppHealthMockApplicationLanguageRepository>module.get<AppHealthIApplicationLanguageRepository>(AppHealthIApplicationLanguageRepository);
        mapper = new AppHealthApplicationLanguageMapper();
    });

    describe('main', () =>
    {
        test('FindApplicationLanguageByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an applicationLanguage founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationLanguageByIdQuery(
                    appHealthMockApplicationLanguageData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
