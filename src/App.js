import React from 'react';
import { Connect, useConnect } from '@blockstack/connect';
import ReactBlockstack, { useBlockstack, didConnect } from 'react-blockstack';
import { AppConfig } from 'blockstack';

const appConfig = new AppConfig(['store_write', 'publish_data']);
ReactBlockstack({ appConfig });

function SignedInPage(props) {
  return (
    <div>
      <h1>You are Signed In</h1>
      <button onClick={props.signOut}>
        Sign Out
      </button>
    </div>
  )
}

function LoginPage() {
  const { doOpenAuth } = useConnect();

  return (
    <div>
      <h1>You must sign up or log in</h1>
      <button onClick={() => doOpenAuth(false)}>
        Sign Up
      </button>
      <button onClick={() => doOpenAuth(true)}>
        Sign In
      </button>
    </div>
  )
}

function App() {
  const { userSession, authenticated, signOut } = useBlockstack();

  const authOptions = {
    redirectTo: '/',
    finished: ({ userSession }) => {
      didConnect({ userSession })
    },
    appDetails: {
      name: 'tech-rally-connect-blockstack',
      icon: 'https://tech-rally-test-bucket.s3.us-east-2.amazonaws.com/Profile_Picture.png',
    },
    userSession,
  }

  return (
    <div className="App">
      <Connect authOptions={authOptions}>
        {
          authenticated ? (
            <SignedInPage signOut={signOut} />
          ) : (
            <LoginPage />
          )
        }
      </Connect>
    </div>
  );
}

export default App;
