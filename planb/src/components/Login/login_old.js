/*
// Import FirebaseAuth and firebase.
import React, {useEffect} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /mygames after sign in is successful
    signInSuccessUrl: '/mygames',
    // Auth providers displayed
    signInOptions: [
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.GoogleAuthProvider.PROVIDER_ID
    ],
};

function SignInScreen(props) {
    useEffect(() => {
        const unregisterAuthObserver = auth
            .onAuthStateChanged(user => {
                props.setIsSignedIn(!!user);
            });
        // Make sure we un-register Firebase observers when the component unmounts
        return () => unregisterAuthObserver();
    }, []);

    console.log(auth.currentUser);

    if (!props.isSignedIn) {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
    }
    return (
        <div>
            <h1>My App</h1>
            <p>Welcome {auth.currentUser.displayName}! You are now signed-in!</p>
            <a onClick={() => auth.signOut()}>Sign-out</a>
        </div>
    );


    /!*return (
        <Container>
            <Row className='align-items-center justify-content-center'>
                <h1>PlanB</h1>
            </Row>
            <Row>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </Row>
        </Container>
    );*!/
}

export default SignInScreen*/
