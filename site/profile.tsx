import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {user ? (
        <>
            <a href="https://ejemplo.com">
            <img src={user.picture} alt={user.name} style={{ width: '50px', height: 'auto' }} />
            </a>
            <div style={{ marginLeft: '20px' }}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            </div>
        </>
      ) : (
        <a href="/api/auth/login">
          <div style={{ width: 'auto', height: 'auto', backgroundColor: '#6BB238', color: '#fff', textAlign: 'center', paddingTop: 'auto', paddingBottom: 'auto', paddingLeft: 'auto', paddingRight: 'auto' }}>
            Log In / Registrarse
          </div>
        </a>
      )}
    </div>
  );
}
export { Profile };