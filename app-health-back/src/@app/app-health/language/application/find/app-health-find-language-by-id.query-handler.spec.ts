import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindLanguageByIdQueryHandler } from './app-health-find-language-by-id.query-handler';
import { AppHealthMockLanguageRepository } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.repository';
import { appHealthMockLanguageData } from '@app/app-health/language/infrastructure/mock/app-health-mock-language.data';
import { AppHealthILanguageRepository } from '@app/app-health/language/domain/app-health-language.repository';
import { AppHealthLanguageMapper } from '@app/app-health/language/domain/app-health-language.mapper';
import { AppHealthFindLanguageByIdQuery } from './app-health-find-language-by-id.query';
import { AppHealthFindLanguageByIdService } from './app-health-find-language-by-id.service';

describe('AppHealthFindLanguageByIdQueryHandler', () =>
{
    let queryHandler: AppHealthFindLanguageByIdQueryHandler;
    let service: AppHealthFindLanguageByIdService;
    let repository: AppHealthMockLanguageRepository;
    let mapper: AppHealthLanguageMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindLanguageByIdQueryHandler,
                {
                    provide : AppHealthILanguageRepository,
                    useClass: AppHealthMockLanguageRepository,
                },
                {
                    provide : AppHealthFindLanguageByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindLanguageByIdQueryHandler>(AppHealthFindLanguageByIdQueryHandler);
        service = module.get<AppHealthFindLanguageByIdService>(AppHealthFindLanguageByIdService);
        repository = <AppHealthMockLanguageRepository>module.get<AppHealthILanguageRepository>(AppHealthILanguageRepository);
        mapper = new AppHealthLanguageMapper();
    });

    describe('main', () =>
    {
        test('FindLanguageByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an language founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindLanguageByIdQuery(
                    appHealthMockLanguageData[0].id,

                ),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
