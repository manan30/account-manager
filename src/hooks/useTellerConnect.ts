import { useEffect, useRef, useState } from 'react';

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
        onSuccess: function (enrollment) {
          setInitializing(false);
          setEnrollment(enrollment);
        }
      });
    }
  }, []);

  return { tellerConnectRef, enrollment, initializing };
};
