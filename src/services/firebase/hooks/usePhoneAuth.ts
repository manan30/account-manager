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
  const [processingPhoneNumberStep, setProcessingPhoneNumberStep] = useState(
    false
  );
  const [
    processingVerificationCodeStep,
    setProcessingVerificationCodeStep
  ] = useState(false);
  const [error, setError] = useState(false);

  const handlePhoneNumberStep = async (phoneNumber: string) => {
    try {
      if (reCaptchaVerifierRef.current && auth) {
        setProcessingPhoneNumberStep(true);
        const reCaptchaVerifier = authProviders.helpers.reCaptchaVerifier(
          reCaptchaVerifierRef.current.id
        );

        const verificationId = await authProviders.phoneAuthProvider.verifyPhoneNumber(
          phoneNumber,
          reCaptchaVerifier
        );

        setVerifier(verificationId);
        setAwaitingVerificationCode(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setProcessingPhoneNumberStep(false);
    }
  };

  const handleVerificationCodeStep = async (verificationCode: string) => {
    try {
      setProcessingVerificationCodeStep(true);
      const phoneCredential = await authProviders.helpers.credential(
        verifier,
        verificationCode
      );
      const creds = await auth.signInWithCredential(phoneCredential);
      console.log(creds);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setProcessingVerificationCodeStep(false);
    }
  };

  useEffect(() => {
    if (error) {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'Phone authentication failed. Please try again in some time',
          theme: NOTIFICATION_THEME_FAILURE
        }
      });
    }
  }, [error, notificationDispatch]);

  return {
    reCaptchaVerifierRef,
    awaitingVerificationCode,
    processingPhoneNumberStep,
    processingVerificationCodeStep,
    setAwaitingVerificationCode,
    handlePhoneNumberStep,
    handleVerificationCodeStep
  };
};
