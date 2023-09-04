import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindLanguageQueryHandler } from './app-health-find-language.query-handler';
import { AppHealthMockLanguageRepository } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.repository';
import { AppHealthILanguageRepository } from '@app/app-health/language/domain/app-health-language.repository';
import { AppHealthLanguageMapper } from '@app/app-health/language/domain/app-health-language.mapper';
import { AppHealthFindLanguageQuery } from './app-health-find-language.query';
import { AppHealthFindLanguageService } from './app-health-find-language.service';

describe('AppHealthFindLanguageQueryHandler', () =>
{
    let queryHandler: AppHealthFindLanguageQueryHandler;
    let service: AppHealthFindLanguageService;
    let repository: AppHealthMockLanguageRepository;
    let mapper: AppHealthLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindLanguageQueryHandler,
                {
                    provide : AppHealthILanguageRepository,
                    useClass: AppHealthMockLanguageRepository,
                },
                {
                    provide : AppHealthFindLanguageService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindLanguageQueryHandler>(AppHealthFindLanguageQueryHandler);
        service = module.get<AppHealthFindLanguageService>(AppHealthFindLanguageService);
        repository = <AppHealthMockLanguageRepository>module.get<AppHealthILanguageRepository>(AppHealthILanguageRepository);
        mapper = new AppHealthLanguageMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindLanguageQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an language founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindLanguageQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
