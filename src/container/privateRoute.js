import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './authProvider';
import { sessionStore } from '../utils/auth';
import PreloaderComponent from '../components/commons/preloader/preloaderComponent';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { user, loading, error } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (loading) return <PreloaderComponent />;
                if (error)
                    return (
                        <div role="alert">
                            {error}{' '}
                            <button onClick={() => sessionStore.refresh()}>
                                Yritä uudelleen
                            </button>
                        </div>
                    );
                return user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: '/', state: { from: props.location } }}
                    />
                );
            }}
        />
    );
}
