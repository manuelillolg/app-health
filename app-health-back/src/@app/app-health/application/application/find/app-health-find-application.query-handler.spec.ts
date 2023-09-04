import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { AppHealthFindApplicationQueryHandler } from './app-health-find-application.query-handler';
import { AppHealthMockApplicationRepository } from '@app/app-health/application/infrastructure/mock/app-health-mock-application.repository';
import { AppHealthIApplicationRepository } from '@app/app-health/application/domain/app-health-application.repository';
import { AppHealthApplicationMapper } from '@app/app-health/application/domain/app-health-application.mapper';
import { AppHealthFindApplicationQuery } from './app-health-find-application.query';
import { AppHealthFindApplicationService } from './app-health-find-application.service';

describe('AppHealthFindApplicationQueryHandler', () =>
{
    let queryHandler: AppHealthFindApplicationQueryHandler;
    let service: AppHealthFindApplicationService;
    let repository: AppHealthMockApplicationRepository;
    let mapper: AppHealthApplicationMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppHealthFindApplicationQueryHandler,
                {
                    provide : AppHealthIApplicationRepository,
                    useClass: AppHealthMockApplicationRepository,
                },
                {
                    provide : AppHealthFindApplicationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        queryHandler = module.get<AppHealthFindApplicationQueryHandler>(AppHealthFindApplicationQueryHandler);
        service = module.get<AppHealthFindApplicationService>(AppHealthFindApplicationService);
        repository = <AppHealthMockApplicationRepository>module.get<AppHealthIApplicationRepository>(AppHealthIApplicationRepository);
        mapper = new AppHealthApplicationMapper();
    });

    describe('main', () =>
    {
        test('AppHealthFindApplicationQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an application founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new AppHealthFindApplicationQuery(),
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});
