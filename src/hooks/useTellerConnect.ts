import { useEffect, useRef, useState } from 'react';
import {} from '';

export const useTellerConnect = () => {
  const tellerConnectRef = useRef<{ open: () => void | undefined }>();
  const [accessToken, setAccessToken] = useState<Enrollment | null>(null);

  useEffect(() => {
    if (!tellerConnectRef.current) {
      tellerConnectRef.current = TellerConnect.setup({
        environment: 'development',
        applicationId: 'app_ne22ctjh06r2t6156a000',
        onInit: function () {
          console.log('Teller Connect has initialized');
        },
        onSuccess: function (enrollment) {
          console.log({ enrollment });
          console.log('User enrolled successfully', enrollment.accessToken);
          setAccessToken(enrollment.accessToken);
        },
        onExit: function () {
          console.log('User closed Teller Connect');
        }
      });
    }
  }, []);

  return { tellerConnectRef, accessToken };
};
