// export type TellerConnect = {};

declare module 'teller-connect' {
  export type EnrollmentOptions = {
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

  export type TellerConnectSetupOptions = {
    environment: 'development' | 'production';
    applicationId: string;
    enrollmentId?: string;
    userId?: string;
    onInit?: () => void;
    onSuccess: (enrollmentOptions: EnrollmentOptions) => void;
    onExit?: () => void;
  };

  setup: (options: TellerConnectSetupOptions) => { open: () => void };
}
