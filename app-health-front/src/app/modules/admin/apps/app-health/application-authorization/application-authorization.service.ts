import { AppHealthApplication, AppHealthApplicationAuthorization, AppHealthApplicationInfrastructureService, AppHealthAuthorizationInterface, AppHealthCreateApplicationAuthorization, AppHealthUpdateApplicationAuthorizationById, AppHealthUpdateApplicationAuthorizations } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { AuthorizationInterfaceService } from '../authorization-interface/authorization-interface.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './application-authorization.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationAuthorizationService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthApplicationAuthorization> | null> = new BehaviorSubject(null);
    applicationAuthorizationSubject$: BehaviorSubject<AppHealthApplicationAuthorization | null> = new BehaviorSubject(null);
    applicationAuthorizationsSubject$: BehaviorSubject<AppHealthApplicationAuthorization[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly applicationService: ApplicationService,
        private readonly authorizationInterfaceService: AuthorizationInterfaceService,
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthApplicationAuthorization>>
    {
        return this.paginationSubject$.asObservable();
    }

    get applicationAuthorization$(): Observable<AppHealthApplicationAuthorization>
    {
        return this.applicationAuthorizationSubject$.asObservable();
    }

    get applicationAuthorizations$(): Observable<AppHealthApplicationAuthorization[]>
    {
        return this.applicationAuthorizationsSubject$.asObservable();
    }

    pagination(
        {
            graphqlStatement = paginationQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<GridData<AppHealthApplicationAuthorization>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthApplicationAuthorization>; }>({
                query    : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data.pagination),
                tap(pagination => this.paginationSubject$.next(pagination)),
            );
    }

    findById(
        {
            graphqlStatement = findByIdQuery,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationAuthorization;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationAuthorization;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationAuthorizationSubject$.next(data.object);
                }),
            );
    }

    findByIdWithRelations(
        {
            graphqlStatement = findByIdWithRelationsQuery,
            id = '',
            constraint = {},
            headers = {},
            queryApplications = {},
            constraintApplications = {},
            queryAuthorizationInterfaces = {},
            constraintAuthorizationInterfaces = {},
            queryApplicationInfrastuctureServices = {},
            constraintApplicationInfrastuctureServices = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryAuthorizationInterfaces?: QueryStatement;
            constraintAuthorizationInterfaces?: QueryStatement;
            queryApplicationInfrastuctureServices?: QueryStatement;
            constraintApplicationInfrastuctureServices?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthApplicationAuthorization;
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetAuthorizationInterfaces: AppHealthAuthorizationInterface[];
        appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationAuthorization;
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetAuthorizationInterfaces: AppHealthAuthorizationInterface[];
                appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryApplications,
                    constraintApplications,
                    queryAuthorizationInterfaces,
                    constraintAuthorizationInterfaces,
                    queryApplicationInfrastuctureServices,
                    constraintApplicationInfrastuctureServices,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationAuthorizationSubject$.next(data.object);
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.authorizationInterfaceService.authorizationInterfacesSubject$.next(data.appHealthGetAuthorizationInterfaces);
                    this.applicationInfrastructureServiceService.applicationInfrastuctureServicesSubject$.next(data.appHealthGetApplicationInfrastuctureServices);
                }),
            );
    }

    find(
        {
            graphqlStatement = findQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        object: AppHealthApplicationAuthorization;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationAuthorization;
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationAuthorizationSubject$.next(data.object);
                }),
            );
    }

    get(
        {
            graphqlStatement = getQuery,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        objects: AppHealthApplicationAuthorization[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthApplicationAuthorization[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, query, constraint),
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationAuthorizationsSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryApplications = {},
            constraintApplications = {},
            queryAuthorizationInterfaces = {},
            constraintAuthorizationInterfaces = {},
            queryApplicationInfrastuctureServices = {},
            constraintApplicationInfrastuctureServices = {},
            headers = {},
        }: {
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryAuthorizationInterfaces?: QueryStatement;
            constraintAuthorizationInterfaces?: QueryStatement;
            queryApplicationInfrastuctureServices?: QueryStatement;
            constraintApplicationInfrastuctureServices?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetAuthorizationInterfaces: AppHealthAuthorizationInterface[];
        appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetAuthorizationInterfaces: AppHealthAuthorizationInterface[];
                appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
            }>({
                query    : getRelations,
                variables: {
                    queryApplications,
                    constraintApplications,
                    queryAuthorizationInterfaces,
                    constraintAuthorizationInterfaces,
                    queryApplicationInfrastuctureServices,
                    constraintApplicationInfrastuctureServices,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(result => result.data),
                tap(data =>
                {
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.authorizationInterfaceService.authorizationInterfacesSubject$.next(data.appHealthGetAuthorizationInterfaces);
                    this.applicationInfrastructureServiceService.applicationInfrastuctureServicesSubject$.next(data.appHealthGetApplicationInfrastuctureServices);
                }),
            );
    }

    create<T>(
        {
            graphqlStatement = createMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthCreateApplicationAuthorization;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    updateById<T>(
        {
            graphqlStatement = updateByIdMutation,
            object = null,
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationAuthorizationById;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                },
                context: {
                    headers,
                },
            });
    }

    update<T>(
        {
            graphqlStatement = updateMutation,
            object = null,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            object?: AppHealthUpdateApplicationAuthorizations;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    payload: object,
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    deleteById<T>(
        {
            graphqlStatement = deleteByIdMutation,
            id = '',
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    id,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }

    delete<T>(
        {
            graphqlStatement = deleteMutation,
            query = {},
            constraint = {},
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            query?: QueryStatement;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<FetchResult<T>>
    {
        return this.graphqlService
            .client()
            .mutate({
                mutation : graphqlStatement,
                variables: {
                    query,
                    constraint,
                },
                context: {
                    headers,
                },
            });
    }
}