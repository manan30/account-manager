import { useFirebaseContext } from '../../../providers/FirebaseProvider';

export const useResetPassword = () => {
  const { auth } = useFirebaseContext();

  const handleResetPassword = async (email: string) => {
    await auth.sendPasswordResetEmail(email);
  };

  return { handleResetPassword };
};
