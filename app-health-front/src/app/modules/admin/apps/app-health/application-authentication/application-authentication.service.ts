import { AppHealthApplication, AppHealthApplicationAuthentication, AppHealthApplicationInfrastructureService, AppHealthAuthenticationInterface, AppHealthCreateApplicationAuthentication, AppHealthUpdateApplicationAuthenticationById, AppHealthUpdateApplicationAuthentications } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { AuthenticationInterfaceService } from '../authentication-interface/authentication-interface.service';
import { createMutation, deleteByIdMutation, deleteMutation, fields, findByIdQuery, findByIdWithRelationsQuery, findQuery, getQuery, getRelations, paginationQuery, updateByIdMutation, updateMutation } from './application-authentication.graphql';
import { Injectable } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService, GridData, parseGqlFields, QueryStatement } from '@aurora';
import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationAuthenticationService
{
    paginationSubject$: BehaviorSubject<GridData<AppHealthApplicationAuthentication> | null> = new BehaviorSubject(null);
    applicationAuthenticationSubject$: BehaviorSubject<AppHealthApplicationAuthentication | null> = new BehaviorSubject(null);
    applicationAuthenticationsSubject$: BehaviorSubject<AppHealthApplicationAuthentication[] | null> = new BehaviorSubject(null);

    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly applicationService: ApplicationService,
        private readonly authenticationInterfaceService: AuthenticationInterfaceService,
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
    ) {}

    /**
    * Getters
    */
    get pagination$(): Observable<GridData<AppHealthApplicationAuthentication>>
    {
        return this.paginationSubject$.asObservable();
    }

    get applicationAuthentication$(): Observable<AppHealthApplicationAuthentication>
    {
        return this.applicationAuthenticationSubject$.asObservable();
    }

    get applicationAuthentications$(): Observable<AppHealthApplicationAuthentication[]>
    {
        return this.applicationAuthenticationsSubject$.asObservable();
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
    ): Observable<GridData<AppHealthApplicationAuthentication>>
    {
        // get result, map ang throw data across observable
        return this.graphqlService
            .client()
            .watchQuery<{ pagination: GridData<AppHealthApplicationAuthentication>; }>({
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
        object: AppHealthApplicationAuthentication;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationAuthentication;
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
                    this.applicationAuthenticationSubject$.next(data.object);
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
            queryAuthenticationInterfaces = {},
            constraintAuthenticationInterfaces = {},
            queryApplicationInfrastuctureServices = {},
            constraintApplicationInfrastuctureServices = {},
        }: {
            graphqlStatement?: DocumentNode;
            id?: string;
            constraint?: QueryStatement;
            headers?: GraphQLHeaders;
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryAuthenticationInterfaces?: QueryStatement;
            constraintAuthenticationInterfaces?: QueryStatement;
            queryApplicationInfrastuctureServices?: QueryStatement;
            constraintApplicationInfrastuctureServices?: QueryStatement;
        } = {},
    ): Observable<{
        object: AppHealthApplicationAuthentication;
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetAuthenticationInterfaces: AppHealthAuthenticationInterface[];
        appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationAuthentication;
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetAuthenticationInterfaces: AppHealthAuthenticationInterface[];
                appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
            }>({
                query    : parseGqlFields(graphqlStatement, fields, constraint),
                variables: {
                    id,
                    constraint,
                    queryApplications,
                    constraintApplications,
                    queryAuthenticationInterfaces,
                    constraintAuthenticationInterfaces,
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
                    this.applicationAuthenticationSubject$.next(data.object);
                    this.applicationService.applicationsSubject$.next(data.appHealthGetApplications);
                    this.authenticationInterfaceService.authenticationInterfacesSubject$.next(data.appHealthGetAuthenticationInterfaces);
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
        object: AppHealthApplicationAuthentication;
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                object: AppHealthApplicationAuthentication;
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
                    this.applicationAuthenticationSubject$.next(data.object);
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
        objects: AppHealthApplicationAuthentication[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                objects: AppHealthApplicationAuthentication[];
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
                    this.applicationAuthenticationsSubject$.next(data.objects);
                }),
            );
    }

    getRelations(
        {
            queryApplications = {},
            constraintApplications = {},
            queryAuthenticationInterfaces = {},
            constraintAuthenticationInterfaces = {},
            queryApplicationInfrastuctureServices = {},
            constraintApplicationInfrastuctureServices = {},
            headers = {},
        }: {
            queryApplications?: QueryStatement;
            constraintApplications?: QueryStatement;
            queryAuthenticationInterfaces?: QueryStatement;
            constraintAuthenticationInterfaces?: QueryStatement;
            queryApplicationInfrastuctureServices?: QueryStatement;
            constraintApplicationInfrastuctureServices?: QueryStatement;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        appHealthGetApplications: AppHealthApplication[];
        appHealthGetAuthenticationInterfaces: AppHealthAuthenticationInterface[];
        appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                appHealthGetApplications: AppHealthApplication[];
                appHealthGetAuthenticationInterfaces: AppHealthAuthenticationInterface[];
                appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
            }>({
                query    : getRelations,
                variables: {
                    queryApplications,
                    constraintApplications,
                    queryAuthenticationInterfaces,
                    constraintAuthenticationInterfaces,
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
                    this.authenticationInterfaceService.authenticationInterfacesSubject$.next(data.appHealthGetAuthenticationInterfaces);
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
            object?: AppHealthCreateApplicationAuthentication;
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
            object?: AppHealthUpdateApplicationAuthenticationById;
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
            object?: AppHealthUpdateApplicationAuthentications;
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