declare namespace TellerConnect {
  let EnrollmentResponse: {
    accessToken: string;
    user: {
      id: string;
    };
    enrollment: {
      id: string;
      institution: {
        name: string;
      };
    };
  };

  let TellerConnectSetupOptions: {
    environment: 'development' | 'production' | 'sandbox';
    applicationId: string;
    enrollmentId?: string;
    userId?: string;
    onInit?: () => void;
    onSuccess: (enrollmentResponse: typeof EnrollmentResponse) => void;
    onExit?: () => void;
  };

  let setup: (
    options: typeof TellerConnectSetupOptions
  ) => { open: () => void };
}
