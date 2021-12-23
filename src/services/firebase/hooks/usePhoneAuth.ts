import { useEffect, useRef, useState } from 'react';
import { useFirebaseContext } from '../../../providers/FirebaseProvider';
import { useNotificationDispatch } from '../../../providers/NotificationProvider';
import { NOTIFICATION_THEME_FAILURE } from '../../../utils/Constants/ThemeConstants';

export const usePhoneAuth = () => {
  const notificationDispatch = useNotificationDispatch();
  const { authProviders, auth } = useFirebaseContext();

  const reCaptchaVerifierRef = useRef<HTMLDivElement>(null);

  const [verifier, setVerifier] = useState<string>('');
  const [awaitingVerificationCode, setAwaitingVerificationCode] = useState(
    false
  );
  const [error, setError] = useState(false);

  const handlePhoneNumberStep = async (phoneNumber: string) => {
    try {
      if (reCaptchaVerifierRef.current && auth) {
        const reCaptchaVerifier = authProviders.helpers.reCaptchaVerifier(
          reCaptchaVerifierRef.current.id
        );

        console.log(
          authProviders.phoneAuthProvider.verifyPhoneNumber,
          reCaptchaVerifier
        );

        const verificationId = await authProviders.phoneAuthProvider.verifyPhoneNumber(
          phoneNumber,
          reCaptchaVerifier
        );

        setVerifier(verificationId);
        setAwaitingVerificationCode(true);

        // .then((fulfillment) => {
        //   auth.signInWithCredential(fulfillment).then((creds) => {
        //     console.log({ creds });
        //   });
        // })
        // .catch((err) => console.error({ err }));
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  const handleVerificationCodeStep = async (verificationCode: string) => {
    const phoneCredential = await authProviders.helpers.credential(
      verifier,
      verificationCode
    );
    await auth.signInWithCredential(phoneCredential);
  };

  useEffect(() => {
    notificationDispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        content: 'Phone authentication failed. Please try again in some time',
        theme: NOTIFICATION_THEME_FAILURE
      }
    });
  }, [error, notificationDispatch]);

  return {
    reCaptchaVerifierRef,
    awaitingVerificationCode,
    setAwaitingVerificationCode,
    handlePhoneNumberStep,
    handleVerificationCodeStep
  };
};
