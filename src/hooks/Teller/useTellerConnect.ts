import { useCallback, useEffect, useRef, useState } from 'react';

export const useTellerConnect = () => {
  const tellerConnectRef = useRef<{ open: () => void | undefined }>();
  const [initializing, setInitializing] = useState(true);
  const [enrollment, setEnrollment] = useState<
    typeof TellerConnect.EnrollmentResponse | null
  >(null);

  useEffect(() => {
    if (!tellerConnectRef.current) {
      tellerConnectRef.current = TellerConnect.setup({
        environment: 'development',
        applicationId: `${import.meta.env.VITE_TELLER_APPLICATION_ID}`,
        onInit: function () {
          setInitializing(false);
        },
        onSuccess: function (enrollment) {
          setEnrollment(enrollment);
        }
      });
    }
  }, []);

  const enrollmentCompleted = useCallback(() => {
    setEnrollment(null);
  }, []);

  return {
    openTellerConnect: tellerConnectRef.current?.open,
    enrollment,
    enrollmentCompleted,
    initializing
  };
};
