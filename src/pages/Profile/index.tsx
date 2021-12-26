import React, { useEffect } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import useFirestoreReadQuery from '../../hooks/Firestore/useFirestoreReadQuery';
import useFirestoreUpdateQuery from '../../hooks/Firestore/useFirestoreUpdateQuery';
import { useFormState } from '../../hooks/Form/useFormState';
import { User, UserCollection } from '../../models/User';
import { useGlobalState } from '../../providers/GlobalStateProvider';
import { useNotificationDispatch } from '../../providers/NotificationProvider';
import { NOTIFICATION_THEME_SUCCESS } from '../../utils/Constants/ThemeConstants';
import { FormValues, FormErrors, FormFields } from './interfaces';
import { formFields } from './utils/constants';

const Profile = () => {
  const { user } = useGlobalState();
  const notificationDispatch = useNotificationDispatch();
  const { data, isLoading: fetchingUser } = useFirestoreReadQuery<User>({
    collection: UserCollection,
    whereClauses: [['uid', '==', user?.uid]]
  });
  const [
    updateUserMutation,
    { isLoading: updatingUser }
  ] = useFirestoreUpdateQuery<User>({
    collectionName: UserCollection,
    onSuccess: () => {
      notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          content: 'User updated successfully',
          theme: NOTIFICATION_THEME_SUCCESS
        }
      });
    }
  });

  const { values, setFormValues, setValues } = useFormState<
    FormValues,
    FormErrors
  >({
    initialValues: {
      displayName: user?.displayName ?? '-',
      email: user?.email ?? '-',
      phoneNumber: user?.phoneNumber ?? '-'
    },
    initialErrors: {
      displayName: false,
      email: false,
      phoneNumber: false
    }
  });

  useEffect(() => {
    const user = data?.[0];
    setValues({
      displayName: user?.displayName ?? '-',
      email: user?.email ?? '-',
      phoneNumber: user?.phoneNumber ?? '-'
    });
  }, [data, setValues]);

  const disabled = updatingUser || fetchingUser;

  const handleUserUpdate = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const updatedUser = {} as User;

    if (user?.email !== values.email) updatedUser.email = values.email;
    if (user?.displayName !== values.displayName)
      updatedUser.displayName = values.displayName;
    if (user?.phoneNumber !== values.phoneNumber)
      updatedUser.phoneNumber = values.phoneNumber;

    if (Object.keys(updatedUser).length) {
      updateUserMutation(data?.[0].id ?? '', updatedUser);
    }
  };

  return (
    <form
      className='flex flex-col items-center max-w-md mx-auto mt-6 space-y-6'
      onSubmit={handleUserUpdate}
    >
      {formFields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          value={values[field.name]}
          type={field.inputType}
          placeholder={field.placeholder}
          onChange={(name, value) => setFormValues(name as FormFields, value)}
          disabled={
            disabled ||
            (field.name !== 'displayName' && data?.[0][field.name] !== '-')
          }
        />
      ))}
      <Button
        className='ml-auto'
        type='submit'
        disabled={disabled}
        loading={updatingUser}
      >
        Save Changes
      </Button>
    </form>
  );
};

export default Profile;
