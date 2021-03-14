type EnrollmentOptions = {
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

type TellerConnectSetupOptions = {
  environment: 'development' | 'production';
  applicationId: string;
  enrollmentId?: string;
  userId?: string;
  onInit?: () => void;
  onSuccess: (enrollmentOptions: EnrollmentOptions) => void;
  onExit?: () => void;
};

declare let TellerConnect: {
  setup: (options: TellerConnectSetupOptions) => { open: () => void };
};
